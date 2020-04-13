import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { DestinyManifest, DestinyInventoryItemDefinition } from 'bungie-api-ts/destiny2/interfaces';
import { ServerResponse } from 'bungie-api-ts/common';
import * as localForage from 'localforage';

import { BungieHttpService } from './bungie-http.service';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {

  public state: ManifestServiceState = {
    loaded: false
  };
  public state$ = new BehaviorSubject<ManifestServiceState>(this.state);

  public InventoryItem?: {
    get(hash: number): DestinyInventoryItemDefinition;
  }

  private store: LocalForage;
  private definitions: BehaviorSubject<any>;

  private localManifestVersion: string = 'd2-manifest-version';
  private localManifestData: string = 'd2-manifest';

  constructor(
    private http: HttpClient,
    private bHttp: BungieHttpService
  ) {
    this.store = localForage.createInstance({
      name: 'Glory.report',
      storeName: 'glory-report',
      description: `Glory.report's database`
    });

    this.store.getItem<string>(this.localManifestVersion)
      .then((currentVersion: string) => {
        this.definitions = new BehaviorSubject(null);
        this.definitions.pipe(
          switchMap(() => {
            return this.bHttp.get('Destiny2/Manifest/');
          }),
          switchMap((res: ServerResponse<DestinyManifest>) => {
            const path: string = res.Response.jsonWorldComponentContentPaths['en']['DestinyInventoryItemLiteDefinition'];
            const version: string = path;

            try {
              if (currentVersion === version) {
                const manifest: Promise<object> = this.store.getItem<object>(this.localManifestData);

                if (!manifest) {
                  throw new Error('Empty cached manifest file');
                }
                return manifest;
              } else {
                throw new Error(`version mismatch`);
              }
            } catch (e) {
              return this.http.get(`https://www.bungie.net${path}`)
                .pipe(
                  map(manifest => {
                    this.saveToDB(manifest, version);
                    return manifest;
                  })
                );
            }
          }),
          map(manifest => {
            this.InventoryItem = {
              get(hash: number): DestinyInventoryItemDefinition {
                return manifest[hash];
              }
            }

            this.loaded = true;
          })
        ).subscribe(); // need 114-155 ?
      });
  }

  set loaded(loaded: boolean) {
    this.setState({ loaded });
  }

  private async saveToDB(manifest: object, version: string) {
    try {
      await this.store.setItem(this.localManifestData, manifest)
        .then(() => {
          console.log(`Sucessfully stored manifest file.`);
          this.store.setItem(this.localManifestVersion, version);
        });
    } catch (e) {
      console.error('Error saving manifest file', e);
    }
  }

  private setState(newState: Partial<ManifestServiceState>) {
    this.state = { ...this.state, ...newState };
    this.state$.next(this.state);
  }
}

export interface ManifestServiceState {
  loaded: boolean;
  // error?: Error;
  // statusText?: string;
}