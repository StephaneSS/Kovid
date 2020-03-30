import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Schedule } from '../../custom-classes';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  @Input() schedules: Schedule[];
  @Input() editable: boolean = false;
  @Output() scheduled = new EventEmitter<FormGroup>();

  viewAsFullText: boolean = true;
  newScheduleValue: string;
  schedulesForm: FormGroup = new FormGroup({
    'addSchedule': this.createScheduleFormControl({
      cronValue: '',
      text: ''
    }),
    'schedules': new FormArray([])
  });

  get scheduleControles() {
    return this.schedulesForm.get("schedules") as FormArray;
  }

  get addScheduleControle() {
    return this.schedulesForm.get("addSchedule") as FormControl;
  }

  constructor(private scheduleService: ScheduleService, private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.viewAsFullText = !this.editable;
    this.initScheduleFormControl();

  }

  initScheduleFormControl() {
    /*this.schedulesForm = this.formBuilder.group({
      schedules: new FormArray(this.schedules.map(elem => this.createScheduleFormControl(elem)))
    });*/
    this.schedulesForm.removeControl('schedules');
    this.schedulesForm.addControl('schedules', new FormArray(this.schedules.map(elem => this.createScheduleFormControl(elem))));
    this.schedulesForm.markAllAsTouched();
  }



  createScheduleFormControl(schedule: Schedule) {
    return this.formBuilder.group({
      ...schedule,
      ... {
        cronValue: [schedule.cronValue, Validators.pattern(/^[a-z-0-9*/]*( [a-z-0-9*/]*){4}$/i)]
      }
    });
  }

  removeSchedule(i: number): void {
    this.schedules.splice(i, 1);
    this.initScheduleFormControl();
    this.scheduled.emit(this.schedulesForm.get('schedules') as FormGroup);
  }

  addSchedule(): void {

    if (this.addScheduleControle.value.cronValue && this.addScheduleControle.valid) {

      // add the value
      this.schedules.unshift({
        cronValue: this.addScheduleControle.value.cronValue,
        text: ''
      });
      this.initScheduleFormControl();
      this.updateCronDescription(0);

      // clean 'add new' field
      this.addScheduleControle.reset();
      this.addScheduleControle.markAllAsTouched();

    }

  }

  updateCronDescription(i: number): void {

    const cronExpression = this.scheduleControles.controls[i].value.cronValue;
    this.schedules[i].cronValue = cronExpression;
    this.schedules[i].text = 'Getting the description...';
    this.scheduleControles.controls[i].setValue(this.schedules[i]);

    this.scheduleService.getCronDescription(cronExpression).subscribe(
      expression => {
        this.schedules[i].text = expression;
        this.scheduleControles.controls[i].setValue(this.schedules[i]);
        this.scheduled.emit(this.schedulesForm.get('schedules') as FormGroup);
      },
      () => {
        this.schedules[i].text = 'Cannot get a description';
        this.scheduleControles.controls[i].setValue(this.schedules[i]);
        this.scheduled.emit(this.schedulesForm.get('schedules') as FormGroup);
      }
    );
  }

  updateNewScheduleDescription(): void {
    const cronExpression = this.addScheduleControle.value.cronValue;
    this.addScheduleControle.setValue({
      cronValue: cronExpression,
      text: 'Getting the description...'
    });
    this.scheduleService.getCronDescription(cronExpression).subscribe(
      expression => this.addScheduleControle.setValue({
        cronValue: cronExpression,
        text: expression
      }),
      () => this.addScheduleControle.setValue({
        cronValue: cronExpression,
        text: 'Cannot get an expression'
      })
    );
  }
  
}
