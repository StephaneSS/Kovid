import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as cloneDeep from 'lodash/cloneDeep';
import { Report } from '../../custom-classes';

@Component({
  selector: 'app-dialog-edit-report',
  templateUrl: './dialog-edit-report.component.html',
  styleUrls: ['./dialog-edit-report.component.scss']
})
export class DialogEditReportComponent implements OnInit {

  src_report: Report;
  edited_report: Report;

  constructor(
    public dialogRef: MatDialogRef<DialogEditReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Report) {}

  ngOnInit(): void {
    this.src_report = this.data; 
    this.edited_report = cloneDeep(this.src_report);
  }

}
