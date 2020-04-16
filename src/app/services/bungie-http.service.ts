import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { ServerResponse } from 'bungie-api-ts/common';

@Injectable({
  providedIn: 'root'
})
export class BungieHttpService {

  private origin: string;
  private key: string;

  public error: BehaviorSubject<ServerResponse<any>>;

  constructor(private http: HttpClient) {
    this.error = new BehaviorSubject(null);
    this.origin = window.location.protocol + '//' + window.location.hostname;
    switch (this.origin) {
      case 'http://dev.glory.report':
        this.key = 'ecc34e9250b34803ae6e09405568df82';
        break;

      case 'https://glory.report':
        this.key = '457b1436a98a4390be099a140c42fd3d';
        break;
    }
  }

  get(url: string, stats: boolean = false, params: any = {}, headers: any = {}): Observable<ServerResponse<any>> {
    const options = {
      headers: new HttpHeaders({
        ...headers,
        'x-api-key': this.key
      }),
      params: new HttpParams({
        fromObject: params
      })
    };

    const endpoint = `https://${(stats ? 'stats' : 'www')}.bungie.net/Platform/`;
    return this.http.get<ServerResponse<any>>(endpoint + url, options);
  }
}
