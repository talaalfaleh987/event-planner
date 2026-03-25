import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AppEvent } from '../../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  getEvent(): Observable<AppEvent> {
    return of({
      name: '',
      category: '',
      type: 'online',
      location: '',
      link: '',
      date: '',
      time: '',
      capacity: '',
    });
  }
}
