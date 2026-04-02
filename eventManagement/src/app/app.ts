import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Language } from './enums/language.enum';
import { TranslateService } from '@ngx-translate/core';
<<<<<<< HEAD
import { PieChartType } from './enums/charts.enum';
=======
import { GroupedBar } from "./components/charts/bar/grouped-bar/grouped-bar";
>>>>>>> e827548 (feat: grouped bar chart)

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GroupedBar],
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

}
