import { Component } from '@angular/core';
import { INPUT_ARGS } from './report/mock-input-args' // FIXME: Only for mocking
import { SCHEDULES } from './report/mock-schdules' // FIXME: Only for mocking
import { DESTIATIONS } from './report/mock-destinations' // FIXME: Only for mocking

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KoRe';
  input_args = INPUT_ARGS;
  schedules = SCHEDULES;
  destinations = DESTIATIONS;
}
