import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GeocodeService } from 'src/app/services/geocode.service';

import { Select } from '@ngxs/store';
import { AddressState } from 'src/app/store/_address/address.action';
import { Observable, Subscription } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { take, ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
  providers: [GeocodeService],
})
export class GeoMapComponent implements OnInit, OnChanges, OnDestroy {
  @Select(AddressState.states) states$: Observable<any[]>;

  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  @Input() label: string | null = 'Marca la ubicación exacta de la escuela';

  @Input() municipality: any | null = null;
  @Input() state: any | null = null;

  @Output() laT = new EventEmitter<number>();
  @Output() longT = new EventEmitter<number>();

  subscription: Subscription;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  labelState: string;
  labelMunicipality: string;

  constructor(
    private addressService: AddressService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnDestroy(): void {
    this.latitude = null;
    this.longitude = null;

    this.municipality = null;
    this.state = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    /**
     * The location of the map is filtered, by state and municipality
     */

    if (changes.state) {

      if ( this.state === null ) { // <-- Set up update
        console.log('crear');
      } else if (this.state !== null) {

        if ( changes.state.previousValue !== null ) {
          this.subscription = this.states$.pipe(take(1)).subscribe(
            (response) => {
              response.find((value) => {
                if (value.id === this.state) {
                  this.labelState = value.name;
                  return true;
                }
              });
            },
            (err) => {},
            () => {
              this.subscription = this.addressService
                .getMunicipalityByState(this.state)
                .subscribe(
                  (response) => {
                    response.forEach((value) => {
                      if (value.id === this.municipality) {
                        this.labelMunicipality = value.name;
                      }
                    });
                  },
                  (err) => {},
                  () => {
                    this.geoCoder.geocode(
                      {
                        address: `Venezuela, ${
                          this.labelState ? this.labelState : ''
                        }${
                          this.labelMunicipality
                            ? ', ' + this.labelMunicipality
                            : ''
                        }`,
                      },
                      (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                          this.latitude = results[0].geometry.location.lat();
                          this.longitude = results[0].geometry.location.lng();

                          this.zoom = 8;
                        }
                      }
                    );
                  }
                );
            }
          );
        }
      }

      if (!changes.state.firstChange) {
         if (this.longitude !== null || this.latitude !== null) {

         }
       }
    }
  }

  ngOnInit() {
    // -- Load Places Autocomplete --
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  // -- Get Current Location Coordinates --
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (this.latitude === 0 && this.longitude === 0) {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        }
        this.zoom = 8;
      });
    }
  }

  mapClicked($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;

    this.laT.emit(this.latitude);
    this.longT.emit(this.longitude);
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;

    this.laT.emit(this.latitude);
    this.longT.emit(this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
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
