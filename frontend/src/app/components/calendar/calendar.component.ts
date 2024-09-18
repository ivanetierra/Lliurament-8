import { Component, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [timeGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    dateClick: this.handleDateClick.bind(this),
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
}
