import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Schedule } from '../../custom-classes';

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  @Input() schedules: Schedule[];
  @Input() editable: boolean = false;

  viewAsFullText: boolean = true;
  newScheduleValue: string;
newSched = new FormControl('', [Validators.pattern(/^[a-z-0-9*/]*( [a-z-0-9*/]*){4}$/i)]);

  constructor() { }

  getErrorMessage(): string {
    return this.newSched.hasError('pattern') ? 'Wrong cron format' : '';
  }

  ngOnInit(): void {
    this.viewAsFullText = !this.editable;
    if (this.editable) {
      this.newSched.markAllAsTouched();
    }
  }

  removeSchedule(i: number): void {
    this.schedules.splice(i, 1);
  }

  addSchedule(scheduleValue): void {
    if (scheduleValue && this.newSched.valid && !this.getErrorMessage()) {
      this.newSched.reset();
      this.newSched.markAllAsTouched();
      this.schedules.unshift({
        cronValue: scheduleValue,
        text: 'Getting the description...'
      });
    }
  }

  updateCronDescription(cronExpression: string, i: number): void {
    this.schedules[i].cronValue = cronExpression;
    this.schedules[i].text = "Getting the description...";
    setTimeout(() => {
      this.schedules[i].text = this.getCronDescription(cronExpression);
    }, 500);
  }

  getCronDescription(cronExpression: string): string {
    return "New description from " + cronExpression;
  }
}
