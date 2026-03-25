import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Event } from '../../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  getEvent(): Observable<Event> {
    return of({
      name: 'EVENTS.TECH_CONFERENCE_2026',
      category: 'Work',
      type: 'online',
      location: 'Virtual',
      link: 'https://www.techconference2026.com',
      date: '24-4-2026',
      time: '18:00',
      capacity: '150',
    });
  }
}
