import { Component, OnInit } from '@angular/core';
import { REPORT2 } from './report/mock-report'
import { ReportService } from './services/report/report.service';
import { DialogEditReportComponent } from './report/dialog-edit-report/dialog-edit-report.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'KoRe';

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog,){}

  ngOnInit(): void {
    this.selectReport(1);
  }
  isError = false;
  report = null;

  selectReport(id: number): void {
    this.isError = false;
    this.reportService.getReport(id).subscribe(
      (report) => this.report = report,
      () => this.isError = true
    );
  }

  openNewReportDialog(): void {
    const dialogRef = this.dialog.open(DialogEditReportComponent, {
      width: '90%',
      disableClose: true,
      data: {
        name: '',
        description: '',
        arguments: [],
        schedules: [],
        postProcesses: [],
        executionLogs: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //todo
        console.log(result);
      }
    });
  }

}
