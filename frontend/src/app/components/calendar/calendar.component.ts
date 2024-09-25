import { Component, OnInit, effect } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions | undefined;
  isModalOpen = false;
  newEventTitle = '';
  selectedEvent: any = null;

  constructor(private calendarService: CalendarService) {
    // Move the effect() call to the constructor, where it has proper injection context
    effect(() => {
      const events = this.calendarService.events(); // Get the updated events from the signal
      console.log('Events bound to FullCalendar:', events); // Debugging log
      if (this.calendarOptions) {
        this.calendarOptions.events = events; // Set the events in FullCalendar options
      }
    });
  }

  ngOnInit(): void {
    // Initialize the calendar options without the effect()
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      plugins: [timeGridPlugin, interactionPlugin],
      editable: true,
      selectable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
    };

    // Fetch the initial events from the backend
    this.calendarService.getEvents();
  }

  handleDateClick(arg: any) {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, start: arg.dateStr, end: arg.dateStr };
      this.calendarService.createEvent(newEvent);
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
      this.isModalOpen = false;
      this.selectedEvent = null;
      this.newEventTitle = '';
    }
  }

  deleteEvent() {
    this.selectedEvent.remove();
    this.isModalOpen = false;
    this.selectedEvent = null;
    this.newEventTitle = '';
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEvent = null;
    this.newEventTitle = '';
  }

  onTitleInput(event: any) {
    this.newEventTitle = event.target.value;
  }
}
