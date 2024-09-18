import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  selectedEvent: any = null;
  isModalOpen = false;
  newEventTitle: string = '';

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
  };

  handleDateClick(arg: any) {
    const title = prompt('Enter event title:');
    if (title) {
      const currentEvents = Array.isArray(this.calendarOptions.events)
        ? this.calendarOptions.events
        : [];
      this.calendarOptions.events = [
        ...currentEvents,
        { title, start: arg.dateStr },
      ];
    }
  }

  handleEventClick(info: any) {
    this.selectedEvent = info.event;
    this.newEventTitle = info.event.title;
    this.isModalOpen = true;
  }

  updateEvent() {
    if (this.newEventTitle.trim() !== '') {
      this.selectedEvent.setProp('title', this.newEventTitle);
      this.closeModal();
    }
  }

  deleteEvent() {
    this.selectedEvent.remove();
    this.closeModal();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEvent = null;
    this.newEventTitle = '';
  }

  // Handle input changes
  onTitleInput(event: any) {
    this.newEventTitle = event.target.value;
  }
}
