import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { Schedule, Environment } from '../../custom-classes';
import { ScheduleService } from '../../services/schedule/schedule.service';
import { DestinationService } from '../../services/destination/destination.service';
import { EnvironmentService } from '../../services/environment/environment.service';

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
    'schedules': new FormArray([])
  });
  environments: Environment[] = [];
  totalDestinations: number[] = [];
  done = false;

  get scheduleControles(): FormArray {
    return this.schedulesForm.get("schedules") as FormArray;
  }

  constructor(private environmentService: EnvironmentService, private destinationService: DestinationService, private scheduleService: ScheduleService, private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initScheduleFormControl();
    this.notifyChanges();
    this.environmentService.getEnvironments().subscribe(
      envs => this.environments = envs
    );
    this.totalDestinations = new Array(this.schedules.length);
    setTimeout(() => this.done = true );
  }

  initScheduleFormControl() {
    this.schedulesForm.removeControl('schedules');
    this.schedulesForm.addControl('schedules', new FormArray(this.schedules.map(elem => this.createScheduleFormControl(elem))));
    this.schedulesForm.markAllAsTouched();
  }

  createScheduleFormControl(schedule: Schedule): FormGroup {
    let validators: ValidatorFn[] = [Validators.pattern(/^[^ ]+( +[^ ]+){4,6}$/i), Validators.required];
    return this.formBuilder.group({
      ...schedule,
      ... {
        cronExpression: [schedule.cronExpression, validators]
      }
    });
  }

  removeSchedule(i: number): void {
    let control = <FormArray>this.schedulesForm.controls.schedules;

    control.removeAt(i);
    this.notifyChanges();
  }

  addSchedule(): void {
    let control = <FormArray>this.schedulesForm.controls.schedules;

    control.push(this.createScheduleFormControl({
      cronExpression: '',
      text: 'Enter a cron expression',
      environment: this.environments[0],
      destinations: this.destinationService.getEmptyDestinations()
    }));

    control.markAllAsTouched();
  }

  updateCronDescription(i: number): void {
    let control = <FormArray>this.schedulesForm.controls.schedules;
    let schedule = <FormGroup>control.at(i);

    schedule.controls.text.setValue('Getting the description...');

    this.scheduleService.getCronDescription(schedule.value.cronExpression).subscribe(
      description => schedule.controls.text.setValue(description),
      () =>　{
        schedule.controls.cronExpression.setErrors({'pattern':true});
        schedule.controls.text.setValue('Cannot get a description');
      },
    ).add(
      () => this.notifyChanges()
    );


  }

  notifyChanges(): void {
    this.schedulesChanged.emit(this.schedulesForm.get('schedules') as FormGroup);
  }

  destinationsValueChanged(index: number, destinationForm: FormGroup) {
    let control = <FormArray>this.schedulesForm.controls.schedules;
    let schedule = <FormGroup>control.at(index);
    schedule.controls.destinations = destinationForm;
    this.notifyChanges();
  }

  areSameEnv(a, b): boolean {
    return a && b && a.id == b.id;
  }

}
