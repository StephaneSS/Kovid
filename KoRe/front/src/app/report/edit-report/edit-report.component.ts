import { Component, OnInit, Input } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Report } from '../../custom-classes';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EditReportComponent implements OnInit {

  @Input() report: Report;

  constructor() { }

  ngOnInit(): void {
  }

}
