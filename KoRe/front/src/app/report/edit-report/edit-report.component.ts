import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Report } from '../../custom-classes';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  @Output() reportChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private readonly formBuilder: FormBuilder) { }

  reportForms: FormGroup = new FormGroup({
    schedules: this.formBuilder.array([]),
    inputArgs: this.formBuilder.array([]),
    postProcesses: this.formBuilder.array([]),
    destinations: this.formBuilder.array([])
  });

  ngOnInit(): void {
    this.reportForms.addControl('name', new FormControl(this.report.name, [Validators.required]) );
    this.reportForms.addControl('description', new FormControl(this.report.description, []));
    this.reportForms.addControl('output', new FormControl(this.report.output, []));
    this.reportForms.markAllAsTouched();
  }

  valueChanged(selector: string, value: FormGroup|FormControl): void{
    this.reportForms.removeControl(selector);
    this.reportForms.addControl(selector,value);
    this.notifyChanges();
  }

  valueChangedWithin(){
    this.notifyChanges();
  }

  notifyChanges(): void {
    this.reportChanged.emit(this.reportForms);
    console.log(this.report.postProcesses);
  }

}
