import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as cloneDeep from 'lodash/cloneDeep';
import { Report } from '../../custom-classes';
import { FormGroup } from '@angular/forms';
import { ReportService } from '../../services/report/report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-report',
  templateUrl: './dialog-edit-report.component.html',
  styleUrls: ['./dialog-edit-report.component.scss']
})
export class DialogEditReportComponent implements OnInit {

  src_report: Report;
  edited_report: Report;

  reportForm: FormGroup;

  constructor(
    private reportService: ReportService,
    public dialogRef: MatDialogRef<DialogEditReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Report) {}

  ngOnInit(): void {
    this.src_report = this.data;
    this.reportForm = new FormGroup({});
  }

  saveReport() {
    let report: Observable<Report>;
    if(this.src_report.id) {
      report = this.reportService.updateReport(this.src_report.id, this.reportForm.value);
    } else {
      report = this.reportService.addReport(this.reportForm.value);
    }
    report.subscribe(
      report => console.log(report),
      error => console.error(error) 
    );
  }

}
