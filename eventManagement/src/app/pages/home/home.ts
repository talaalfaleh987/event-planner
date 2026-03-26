import { Component } from '@angular/core';
import { StackedBarChart } from '../../charts/bar/stacked-bar-chart/stacked-bar-chart';
import { MonthlyEventsChartItem } from '../../models/charts/monthly-events-chart-Item';

@Component({
  selector: 'app-home',
  imports: [StackedBarChart],
  templateUrl: './home.html',
})
export class Home {
  protected chartData: MonthlyEventsChartItem[] = [
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
  ];
}
