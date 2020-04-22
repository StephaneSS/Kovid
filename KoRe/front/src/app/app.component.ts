import { Component, OnInit } from '@angular/core';
import { REPORT2 } from './report/mock-report'
import { ReportService } from './services/report/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'KoRe';

  constructor(private reportService: ReportService){}

  ngOnInit(): void {
    this.selectReport(10);
  }

  report = null;

  selectReport(id: number): void {
    this.reportService.getReport(id).subscribe(
      (report) =>this.report = report,
    );
  }


}
