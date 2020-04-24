import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from '../../custom-classes';
import { FormGroup } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep'
import { ReportService } from '../../services/report/report.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit-report',
  templateUrl: './dialog-edit-report.component.html',
  styleUrls: ['./dialog-edit-report.component.scss']
})
export class DialogEditReportComponent implements OnInit {

  src_report: Report;
  edited_report: Report;

  reportFormEvent: EventEmitter<FormGroup> = new EventEmitter<FormGroup>(true);
  reportForm: FormGroup = new FormGroup({});

  saveInProgress: boolean = false;

  constructor(
    private reportService: ReportService,
    public dialogRef: MatDialogRef<DialogEditReportComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Report) { }

  ngOnInit(): void {
    this.src_report = this.data;
    this.edited_report = cloneDeep(this.src_report);
    this.reportFormEvent.subscribe((report) => this.reportForm = report);
  }


  saveReport() {
    let report: Observable<Report>;
    if (this.src_report.id) {
      report = this.reportService.updateReport(this.src_report.id, this.reportForm.value);
    } else {
      report = this.reportService.addReport(this.reportForm.value);
    }
    this.saveInProgress = true;
    report.subscribe(
      (report) => {
        this._snackBar.open("report successfully updated", "close", {
          duration: 2000
        });
        this.dialogRef.close(report);
        this.saveInProgress = false;
      },
      () => {
        this._snackBar.open("An error occured while updating the report", "close", {
          duration: 2000
        });
        this.saveInProgress = false;
      }
    );
  }

}
