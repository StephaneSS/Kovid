import { Component, OnInit, Input, Inject , ViewChild} from '@angular/core';
import {  Reports} from './../../custom-classes';
import { REPORTS } from '../mock-monitoring';
import { REPORT } from '../../report/mock-report';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  @Input() reports: Reports[];
  report= REPORT;
  displayedColumns: string[] = ['name', 'lastExecDate', 'status', 'env'];

  
  dataSource = new MatTableDataSource<Reports>(REPORTS);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private reportService: ReportService){}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectReport(9);
  }

  search(rep: string): void {
  
    console.log(rep);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openTab(){
    window.open("../view-report/view-report.component.html", "_blank");
  }
  isError = false;
  
  selectReport(id: number): void {
    this.isError = false;
    this.reportService.getReport(id).subscribe(
      (report) => this.report = report,
      () => this.isError = true
    );
  }
}
