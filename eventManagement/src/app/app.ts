import { Component, inject, input, signal } from '@angular/core';
import { NavItem } from './models/nav-item';
import { Header } from './components/header/header';
import { TypographyStyle } from './enums/typography.enum';
import { Text } from './components/text/text';
import { TranslateButton } from './components/translate-button/translate-button';
import { Language } from './enums/language.enum';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [Header, Text ,TranslatePipe],
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

  readonly TypographyStyle = TypographyStyle;

  navItems: NavItem[] = [
    { label: 'الرئيسية', route: '/home' },
    { label: 'إدارة الفعاليات', route: '/events' },
  ];
}
