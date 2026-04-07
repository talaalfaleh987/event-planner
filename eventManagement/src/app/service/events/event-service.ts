import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Data } from '../../models/data';
import { MonthlyEventsChartItem } from '../../models/charts/monthly-events-chart-Item';
import { PieChartItem } from '../../models/charts/events-pie-charts-data';
import { MonthlyAttendanceChartItem } from '../../models/charts/monthly-attendance-chartI-tem';import { Option } from '../../models/dropdown/option';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  getEvent(): Observable<Data> {
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

  getMonthlyAttendanceData(): Observable<MonthlyAttendanceChartItem[]> {
    return of([
      { month: '1', male: 14000, female: 12500 },
      { month: '2', male: 17000, female: 11500 },
      { month: '3', male: 6000,  female: 22500 },
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
