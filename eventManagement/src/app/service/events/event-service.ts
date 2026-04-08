import { Injectable } from '@angular/core';
import { of, Observable, map, BehaviorSubject } from 'rxjs';
import { EventData } from '../../models/data';
import { MonthlyEventsChartItem } from '../../models/charts/monthly-events-chart-Item';
import { PieChartItem } from '../../models/charts/events-pie-charts-data';
import { MonthlyAttendanceChartItem } from '../../models/charts/monthly-attendance-chartI-tem';
import { Option } from '../../models/dropdown/option';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsSubject = new BehaviorSubject<EventData[]>([
    {
      id: 1,
      name: 'مؤتمر التقنية 2026',
      category: 'Work',
      type: 'online',
      location: 'افتراضي',
      link: 'https://www.techconference2026.com',
      date: '2026-04-24',
      time: '18:00',
      capacity: '150',
    },
    {
      id: 2,
      name: 'ورشة تطوير الويب',
      category: 'Education',
      type: 'physical',
      location: 'الرياض',
      link: '',
      date: '2026-05-02',
      time: '10:00',
      capacity: '30',
    },
    {
      id: 3,
      name: 'فعالية رسم',
      category: 'Entertainment',
      type: 'physical',
      location: 'جدة',
      link: '',
      date: '2026-05-10',
      time: '20:00',
      capacity: '500',
    },
    {
      id: 4,
      name: 'دورة الذكاء الاصطناعي',
      category: 'Education',
      type: 'online',
      location: 'افتراضي',
      link: 'https://ai-course.com',
      date: '2026-06-01',
      time: '17:00',
      capacity: '200',
    },
    {
      id: 5,
      name: 'لقاء مفتوح للمجتمع',
      category: 'Other',
      type: 'physical',
      location: 'الدمام',
      link: '',
      date: '2026-06-12',
      time: '19:00',
      capacity: '80',
    },
  ]);

  getEvent(id: number): Observable<EventData> {
    return this.getAllEvents().pipe(
      map((events) => {
        const event = events.find((e) => e.id === id);
        if (!event) {
          throw new Error('Event not found');
        }
        return event;
      }),
    );
  }

  getAllEvents(): Observable<EventData[]> {
    return this.eventsSubject.asObservable();
  }

  addEvent(newEvent: Omit<EventData, 'id'>): Observable<EventData> {
    const currentEvents = this.eventsSubject.getValue();

    const newId = currentEvents.length ? Math.max(...currentEvents.map((e) => e.id)) + 1 : 1;

    const eventWithId: EventData = {
      id: newId,
      ...newEvent,
    };

    this.eventsSubject.next([...currentEvents, eventWithId]);
    return of(eventWithId);
    // TODO: use this code in add-event
    //     this.eventService.addEvent({
    //   name: 'فعالية جديدة',
    //   category: 'Other',
    //   type: 'physical',
    //   location: 'الرياض',
    //   link: '',
    //   date: '2026-07-01',
    //   time: '18:00',
    //   capacity: '100',
    // });
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
      { value: 400, name: 'EVENT_TYPE_PHYSICAL', itemStyle: { color: '#77c6a9' } },
      { value: 700, name: 'EVENT_TYPE_ONLINE', itemStyle: { color: '#fad848' } },
    ]);
  }

  getEventCategoriesData(): Observable<PieChartItem[]> {
    return of([
      { value: 1000, name: 'EVENT_CATEGORY_OTHER' },
      { value: 7000, name: 'EVENT_CATEGORY_EDUCATION' },
      { value: 2000, name: 'EVENT_CATEGORY_WORK' },
      { value: 3000, name: 'EVENT_CATEGORY_ENTERTAINMENT' },
    ]);
  }

  getMonthlyAttendanceData(): Observable<MonthlyAttendanceChartItem[]> {
    return of([
      { month: '1', male: 14000, female: 12500 },
      { month: '2', male: 17000, female: 11500 },
      { month: '3', male: 6000, female: 22500 },
      { month: '4', male: 10000, female: 9500 },
      { month: '5', male: 13000, female: 12000 },
      { month: '6', male: 15000, female: 14000 },
      { month: '7', male: 16000, female: 13000 },
      { month: '8', male: 17000, female: 12500 },
      { month: '9', male: 18000, female: 14000 },
      { month: '10', male: 19000, female: 15000 },
      { month: '11', male: 20000, female: 16000 },
      { month: '12', male: 21000, female: 17000 },
    ]);
  }

  getEventTypeOptions(): Observable<Option[]> {
    return of([
      { value: 1, nameAr: 'حضورية', nameEn: 'Physical' },
      { value: 2, nameAr: 'عن بعد', nameEn: 'Online' },
    ]);
  }

  getCategoryOptions(): Observable<Option[]> {
    return of([
      { value: 1, nameAr: 'عمل', nameEn: 'Work' },
      { value: 2, nameAr: 'تعليمية', nameEn: 'Education' },
      { value: 3, nameAr: 'ترفيهية', nameEn: 'Entertainment' },
      { value: 4, nameAr: 'أخرى', nameEn: 'Other' },
    ]);
  }
}
