import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { Schedule } from '../../custom-classes';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { environment } from 'src/environments/environment';
import { DestinationService } from 'src/app/services/destination/destination.service';

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  @Input() schedules: Schedule[];
  @Input() editable: boolean = false;
  @Output() schedulesChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  viewAsFullText: boolean = true;
  schedulesForm: FormGroup = new FormGroup({
    'addSchedule': this.createScheduleFormControl({
      cronExpression: '',
      text: '',
      destinations: this.destinationService.getEmptyDestinations()
    }, false),
    'schedules': new FormArray([])
  });

  get scheduleControles(): FormArray {
    return this.schedulesForm.get("schedules") as FormArray;
  }

  get addScheduleControle(): FormControl {
    return this.schedulesForm.get("addSchedule") as FormControl;
  }

  constructor(private destinationService: DestinationService, private scheduleService: ScheduleService, private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initScheduleFormControl();
    this.notifyChanges();
  }

  initScheduleFormControl() {
    this.schedulesForm.removeControl('schedules');
    this.schedulesForm.addControl('schedules', new FormArray(this.schedules.map(elem => this.createScheduleFormControl(elem))));
    this.schedulesForm.markAllAsTouched();
  }

  createScheduleFormControl(schedule: Schedule, required: boolean = true): FormGroup {
    let validators: ValidatorFn[] = [Validators.pattern(/^[a-z-0-9*/]+( [a-z-0-9*/]+){4}$/i)];
    if(required){
      validators.push(Validators.required);
    }
    return this.formBuilder.group({
      ...schedule,
      ... {
        cronExpression: [schedule.cronExpression, validators]
      }
    });
  }

  removeSchedule(i: number): void {
    this.schedules.splice(i, 1);
    this.initScheduleFormControl();
    this.notifyChanges();
  }

  addSchedule(): void {

    if (this.addScheduleControle.value.cronExpression && this.addScheduleControle.valid) {

      // add the value
      this.schedules.unshift({
        cronExpression: this.addScheduleControle.value.cronExpression,
        text: '',
        environment: null,
        destinations: this.destinationService.getEmptyDestinations()
      });
      this.initScheduleFormControl();
      this.updateCronDescription(0);

      // clean 'add new' field
      this.addScheduleControle.reset();
      this.addScheduleControle.markAllAsTouched();

    }

  }

  updateCronDescription(i: number): void {

    const cronExpression = this.scheduleControles.controls[i].value.cronExpression;
    this.schedules[i].cronExpression = cronExpression;
    this.schedules[i].text = 'Getting the description...';
    this.scheduleControles.controls[i].setValue(this.schedules[i]);

    this.scheduleService.getCronDescription(cronExpression).subscribe(
      expression => {
        this.schedules[i].text = expression;
        this.scheduleControles.controls[i].setValue(this.schedules[i]);
        this.notifyChanges();
      },
      () => {
        this.schedules[i].text = 'Cannot get a description';
        this.scheduleControles.controls[i].setValue(this.schedules[i]);
        this.notifyChanges();
      }
    );
  }

  updateNewScheduleDescription(): void {
    const cronExpression = this.addScheduleControle.value.cronExpression;
    this.addScheduleControle.setValue({
      cronExpression: cronExpression,
      text: 'Getting the description...'
    });
    this.scheduleService.getCronDescription(cronExpression).subscribe(
      expression => this.addScheduleControle.setValue({
        cronExpression: cronExpression,
        text: expression
      }),
      () => this.addScheduleControle.setValue({
        cronExpression: cronExpression,
        text: 'Cannot get an expression'
      })
    );
  }

  notifyChanges(): void {
    this.schedulesChanged.emit(this.schedulesForm.get('schedules') as FormGroup);
  }

}
