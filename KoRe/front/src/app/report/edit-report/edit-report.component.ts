import { Component, OnInit, Input } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Report } from '../../custom-classes';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class EditReportComponent implements OnInit {

  @Input() report: Report;

  constructor(private readonly formBuilder: FormBuilder) { }

  reportForms: FormGroup = new FormGroup({
    schedules: this.formBuilder.array([])
  });

  ngOnInit(): void {
  }

}
