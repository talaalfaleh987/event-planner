import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EventService } from '../../service/events/event-service';
import { map } from 'rxjs';

export const eventResolver: ResolveFn<string> = (route) => {
  const eventService = inject(EventService);

  const idParam = route.paramMap.get('id');

  const id = idParam ? Number(idParam) : null;

  if (!id) {
    throw new Error('Invalid event id');
  }

  return eventService.getEvent(id).pipe(
    map(event => event.name)
  );
};