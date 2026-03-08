import { Component, input, signal } from '@angular/core';
import { NavItem } from './models/nav-item';
import { Header } from './components/header/header';
import { TypographyStyle } from './enums/typography.enum';
import { Text } from './components/text/text';

@Component({
  selector: 'app-root',
  imports: [Header, Text],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('eventManagement');

  readonly TypographyStyle = TypographyStyle;

  navItems: NavItem[] = [
    { label: 'الرئيسية', route: '/home' },
    { label: 'إدارة الفعاليات', route: '/events' },
  ];
}
