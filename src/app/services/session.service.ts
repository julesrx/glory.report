import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Params } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, filter, mergeMap } from 'rxjs/operators';
import {
  DestinyProfileComponent,
  DestinyProfileResponse,
  DestinyCharacterComponent,
  DestinyMetricComponent
} from 'bungie-api-ts/destiny2/interfaces';
import { ServerResponse } from 'bungie-api-ts/common';

import { routeHasProfile, getMembershipTypeFromRoute, getMembershipIdFromRoute } from '../utils/route-utils';
import { DestinyService } from './destiny.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private profile: SessionProfile;
  private state: BehaviorSubject<SessionProfile>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destiny: DestinyService
  ) {
    this.state = new BehaviorSubject(this.profile);

    // TODO: add to localStorage
    // https://github.com/angular/angular/issues/15004
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(actRoute => {
          while (actRoute.firstChild) { actRoute = actRoute.firstChild; }
          return actRoute;
        }),
        filter(actRoute => actRoute.outlet === 'primary'),
        mergeMap(actRoute => actRoute.params)
      )
      .subscribe((params: Params) => {
        if (routeHasProfile(params)) {
          const membershipType = getMembershipTypeFromRoute(params);
          const membershipId = getMembershipIdFromRoute(params);

          if (
            this.profile?.profile?.userInfo.membershipId !== membershipId &&
            this.profile?.profile?.userInfo.membershipType !== membershipType
          ) {
            this.state.next(null);
            this.destiny.getProfile(membershipType, membershipId, '100,200,1100')
              .subscribe((res: ServerResponse<DestinyProfileResponse>) => {
                this.profile = {
                  profile: res.Response.profile.data,
                  characters: Object.keys(res.Response.characters.data)
                    .map(key => res.Response.characters.data[key])
                    .sort((a, b) => a.dateLastPlayed < b.dateLastPlayed ? 1 : -1),
                  metrics: res.Response.metrics.data.metrics
                };
                this.state.next(this.profile);
              });
          }
        }
      });
  }

  get uniqueProfile(): Observable<SessionProfile> {
    return this.state.pipe(
      distinctUntilChanged((prev, curr) => {
        const prevType = prev?.profile?.userInfo.membershipType.toString();
        const currType = curr?.profile?.userInfo.membershipType.toString();

        return prevType === currType && prev?.profile?.userInfo.membershipId === curr?.profile?.userInfo.membershipId;
      }),
      filter(p => p !== null && typeof (p) !== 'undefined')
    );
  }

}

export interface SessionProfile {
  profile: DestinyProfileComponent;
  characters: DestinyCharacterComponent[];
  metrics: { [key: number]: DestinyMetricComponent; };
}