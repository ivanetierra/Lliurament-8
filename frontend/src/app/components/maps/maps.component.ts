import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];
  private locationsSubject = new BehaviorSubject<
    { lat: number; lng: number }[]
  >([]);
  locations$ = this.locationsSubject.asObservable();

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 41.3874, lng: 2.1686 },
      zoom: 8,
    };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.addMarker(event.latLng);
      }
    });
  }

  addMarker(latLng: google.maps.LatLng): void {
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      clickable: true,
    });

    this.markers.push(marker);

    const currentLocations = this.locationsSubject.value;
    this.locationsSubject.next([
      ...currentLocations,
      { lat: latLng.lat(), lng: latLng.lng() },
    ]);

    marker.addListener('click', () => {
      this.removeMarkerByLocation(latLng);
    });
  }

  removeMarkerByLocation(latLng: google.maps.LatLng): void {
    const index = this.markers.findIndex(
      (marker) =>
        marker.getPosition()?.lat() === latLng.lat() &&
        marker.getPosition()?.lng() === latLng.lng()
    );

    if (index !== -1) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);

      const updatedLocations = this.locationsSubject.value.filter(
        (location) =>
          location.lat !== latLng.lat() || location.lng !== latLng.lng()
      );
      this.locationsSubject.next(updatedLocations);
    }
  }

  removeLocation(lat: number, lng: number): void {
    this.removeMarkerByLocation(new google.maps.LatLng(lat, lng));
  }
}
