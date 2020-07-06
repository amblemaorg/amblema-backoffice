import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-geo-map",
  templateUrl: "./geo-map.component.html",
  styleUrls: ["./geo-map.component.scss"],
})
export class GeoMapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() label: string | null = "Marca la ubicación exacta de la escuela";

  @Output() laT = new EventEmitter<number>();
  @Output() longT = new EventEmitter<number>();

  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    // -- Load Places Autocomplete --
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  // -- Get Current Location Coordinates --
  private setCurrentLocation() {
    if ("geolocation" in navigator) {
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
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }
}
