import { Component, OnInit, Input } from '@angular/core';
import { Report } from './../../custom-classes';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  @Input() report: Report;

  constructor() { }

  ngOnInit(): void {
  }

}
