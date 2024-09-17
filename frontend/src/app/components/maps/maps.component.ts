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
  locations$ = this.locationsSubject.asObservable(); // Observable for the template to subscribe to

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );

    // Event listener for map click to add a pin
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

    // Add the marker to the markers array
    this.markers.push(marker);

    // Get current locations, add new location, and emit updated array
    const currentLocations = this.locationsSubject.value;
    this.locationsSubject.next([
      ...currentLocations,
      { lat: latLng.lat(), lng: latLng.lng() },
    ]);

    // Add a click listener for marker to remove it when clicked
    marker.addListener('click', () => {
      this.removeMarkerByLocation(latLng);
    });
  }

  // Remove marker from the map and locations array
  removeMarkerByLocation(latLng: google.maps.LatLng): void {
    // Find the index of the marker
    const index = this.markers.findIndex(
      (marker) =>
        marker.getPosition()?.lat() === latLng.lat() &&
        marker.getPosition()?.lng() === latLng.lng()
    );

    if (index !== -1) {
      // Remove the marker from the map
      this.markers[index].setMap(null);

      // Remove the marker from the markers array
      this.markers.splice(index, 1);

      // Update the locations list by removing the location
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
