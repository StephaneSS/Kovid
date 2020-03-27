import { Component, OnInit, Input } from '@angular/core';
import { Schedule } from '../../custom-classes';

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  @Input() schedules: Schedule[];

  constructor() { }

  ngOnInit(): void {
  }

}
