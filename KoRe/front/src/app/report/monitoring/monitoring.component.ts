import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReportService } from '../../services/report/report.service';
import { ReportSimple, Report } from '../../custom-classes';
import { DialogEditReportComponent } from '../dialog-edit-report/dialog-edit-report.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  reports: ReportSimple[] = [];
  report: Report = null;
  filter: string = '';
  isErrorFetchingReportList: boolean = false;
  isFetchingList: boolean = false;
  isErrorFetchingReport: boolean = false;
  displayedColumns: string[] = ['name', 'lastExecDate', 'status', 'env'];


  dataSource = new MatTableDataSource<ReportSimple>(this.reports);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getReportList();
    this.selectReport(1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getReportList(): void {
    this.isFetchingList = true;
    this.isErrorFetchingReportList = false;
    this.reportService.getAllReports().subscribe(
      (reports) => {
        this.reports = reports;
        this.dataSource.data = this.reports;
        this.isFetchingList = false;
      },
      () => {
        this.isErrorFetchingReportList = true;
        this.isFetchingList = false;
      }
    );
  }

  selectReport(id: number): void {
    this.report = null;
    this.isErrorFetchingReport = false;
    this.reportService.getReport(id).subscribe(
      (report) => this.report = report,
      () => this.isErrorFetchingReport = true
    );
  }

  deleteReportRow(id: number):void {
    let data = this.dataSource.data;
    let index = data.findIndex(row => row.id === id);
    data.splice(index, 1);
    this.dataSource.data = data;
  }

  updateReportRow(report: Report):void {
    let data = this.dataSource.data;
    let index = data.findIndex(row => row.id === report.id);
    data[index] = this.reportService.simplify(report);
    this.dataSource.data = data;
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

    dialogRef.afterClosed().subscribe((result: Report) => {
      if (result) {
        let row = this.reportService.simplify(result);
        this.dataSource.data = this.dataSource.data.concat(row);
      }
    });
  }
}
