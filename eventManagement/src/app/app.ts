import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateButton } from './components/translate-button/translate-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , TranslateButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('eventManagement');
}
