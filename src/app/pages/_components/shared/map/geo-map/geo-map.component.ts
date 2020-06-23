import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
})
export class GeoMapComponent implements OnInit {
  title = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      // const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      // autocomplete.addListener('place_changed', () => {
      //   this.ngZone.run(() => {
      //     // get the place result
      //     const place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //     // verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }

      //     // set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.zoom = 12;
      //   });
      // });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  mapClicked($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  markerDragEnd($event: any) {
    console.log($event);

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }
}