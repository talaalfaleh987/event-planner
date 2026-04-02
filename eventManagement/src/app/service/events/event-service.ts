import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Event } from '../../models/event';
import { MonthlyEventsChartItem } from '../../models/charts/monthly-events-chart-Item';
import { PieChartItem } from '../../models/charts/events-pie-charts-data';


@Injectable({
  providedIn: 'root',
})
export class EventService {
  getEvent(): Observable<Event> {
    return of({
      name: 'مؤتمر التقنية 2026',
      category: 'Work',
      type: 'online',
      location: 'Virtual',
      link: 'https://www.techconference2026.com',
      date: '24-4-2026',
      time: '18:00',
      capacity: '150',
    });
  }

  getMonthlyEventsData(): Observable<MonthlyEventsChartItem[]> {
    return of([
      { month: '1', physical: 5000, remote: 1500 },
      { month: '2', physical: 10500, remote: 5000 },
      { month: '3', physical: 7200, remote: 3000 },
      { month: '4', physical: 14000, remote: 7000 },
      { month: '5', physical: 2500, remote: 800 },
      { month: '6', physical: 8000, remote: 3500 },
      { month: '7', physical: 10500, remote: 5000 },
      { month: '8', physical: 5000, remote: 1500 },
      { month: '9', physical: 15500, remote: 7800 },
      { month: '10', physical: 6800, remote: 2800 },
      { month: '11', physical: 8500, remote: 3700 },
      { month: '12', physical: 5000, remote: 1500 },
    ]);
  }

 getEventTypesData(): Observable<PieChartItem[]> {
  return of([
    { value: 400, name: 'EVENT_TYPE_PHYSICAL', itemStyle: {color: '#77c6a9'} },
    { value: 700, name: 'EVENT_TYPE_ONLINE', itemStyle: {color: '#fad848'} }
  ]);
}

  getEventCategoriesData(): Observable<PieChartItem[]> {
  return of([
    { value: 1000, name: 'EVENT_CATEGORY_OTHER' },
    { value: 7000, name: 'EVENT_CATEGORY_EDUCATION' },
    { value: 2000, name: 'EVENT_CATEGORY_WORK' },
    { value: 3000, name: 'EVENT_CATEGORY_ENTERTAINMENT' }
  ]);
}
}
