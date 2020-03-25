import { Component } from '@angular/core';
import { INPUT_ARGS } from './report/mock-input-args' // FIXME: Only for mocking

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KoRe';
  input_args = INPUT_ARGS
}
