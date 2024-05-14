import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins:[dayGridPlugin, interactionPlugin],
    dateClick: (arg: any) => this.handleDateClick(arg),
    events: [
      { title: "Grande Dia?! ~Tomara!!~", date: '2024-05-17' },
    ],
    locale: 'pt-BR',
  };

  handleDateClick(arg:any) {
    alert('Data Clicada: ' + arg.dateStr);
  }
}
