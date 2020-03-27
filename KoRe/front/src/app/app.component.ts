import { Component } from '@angular/core';
import { REPORT } from './report/mock-report'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KoRe';

  report = REPORT;

}
