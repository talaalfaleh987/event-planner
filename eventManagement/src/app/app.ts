import { Component, inject, input, signal } from '@angular/core';
import { NavItem } from './models/nav-item';
import { Header } from './components/header/header';
import { TranslateButton } from './components/translate-button/translate-button';
import { Language } from './enums/language.enum';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [Header, TranslatePipe, TranslateButton],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('eventManagement');

  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.setFallbackLang(Language.ARABIC);
    this.translate.use(Language.ARABIC);
  }

  protected get currentLang(): string {
    return this.translate.getCurrentLang();
  }

  navItems: NavItem[] = [
    { label: 'HOME', route: '/home' },
    { label: 'EVENTS_MANAGEMENT', route: '/events' },
  ];
}
