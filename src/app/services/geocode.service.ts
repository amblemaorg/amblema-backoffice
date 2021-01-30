import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {}

  private initGeocoder() {

    this.mapLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return of(this.mapLoader.load()).pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {

    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable((observer) => {

          this.geocoder.geocode({ address: location }, (results, status) => {

            if (status === google.maps.GeocoderStatus.OK) {

              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
            } else {
              observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        });
      })
    );
  }
}
