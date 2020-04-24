import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Report, ReportSimple } from '../../custom-classes';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  endpointURL: string = `${environment.endpoint}/report`;

  constructor(private http: HttpClient) { }

  simplify(report: Report): ReportSimple {
    return {
      ...report,
      arguments: report.arguments.map(arg => arg.id),
      postProcesses: report.postProcesses.map(pp => pp.id),
      schedules: report.schedules.map(schedule => schedule.id)
    }
  }

  getAllReports(): Observable<ReportSimple[]> {
    return this.http.get<ReportSimple[]>(`${this.endpointURL}/`);
  }

  getReport(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.endpointURL}/${id}`);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointURL}/${id}`);
  }

  addReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${this.endpointURL}/`, report);
  }

  updateReport(id: number, report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.endpointURL}/${id}`, report);
  }
}
