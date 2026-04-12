import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from './enums/language.enum';
import { TranslateService } from '@ngx-translate/core';
import { Paginator } from './components/paginator/paginator';
import { EventService } from './service/events/event-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Paginator],
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

  eventService = inject(EventService);

  pagedEvents$ = this.eventService.getPaginatedEvents();

  nextPage = () => {
    this.eventService.nextPage();
  };

  previousPage = () => {
    this.eventService.previousPage();
  };

  changePageSize = (size: number) => {
    this.eventService.setPageSize(size);
  };

  goToPage = (page: number) => {
  this.eventService.setPage(page);
};

}
