import { Component, inject } from '@angular/core';
import { NavItem } from '../../models/nav-item';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Header } from '../../components/header/header';
import { TranslateButton } from '../../components/translate-button/translate-button';
import { RouterOutlet } from '@angular/router';
import { RouterPath } from '../../core/router-paths';
import { Language } from '../../enums/language.enum';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-layout',
  imports: [Header, TranslateButton, TranslatePipe, RouterOutlet, Footer],
  templateUrl: './layout.html',
})
export class Layout {
  private readonly translate = inject(TranslateService);
  readonly Language = Language;

  navItems: NavItem[] = [
    { label: 'HOME', route: RouterPath.Pages.HOME },
    { label: 'EVENTS_MANAGEMENT', route: RouterPath.Pages.EVENTS_MANAGEMENT },
  ];

  protected get currentLang(): string {
    return this.translate.getCurrentLang();
  }
}
