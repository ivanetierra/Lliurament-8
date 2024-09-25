import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private eventsUrl = 'http://localhost:3000/calendar/events';

  // Using a signal to manage events
  events = signal<any[]>([]); // Holds the list of events as a signal

  constructor(private http: HttpClient) {}

  // Fetch all events from the backend
  getEvents() {
    this.http.get<any[]>(this.eventsUrl).subscribe((data) => {
      console.log('Fetched events from the backend:', data); // Debugging step
      this.events.set(data); // Update the signal with the fetched events
    });
  }

  // Create a new event
  createEvent(event: any) {
    return this.http.post(this.eventsUrl, event).subscribe(() => {
      this.getEvents(); // Refresh the event list after creating
    });
  }

  // Delete an event by ID
  deleteEvent(eventId: number) {
    return this.http.delete(`${this.eventsUrl}/${eventId}`).subscribe(() => {
      this.getEvents(); // Refresh the event list after deletion
    });
  }
}
