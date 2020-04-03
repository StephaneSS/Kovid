import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  endpointURL: string = `${environment.endpoint}/schedule`;

  constructor(private http: HttpClient) { }

  getCronDescription(cronExpression: string): Observable<string> {
    return this.http.post(`${this.endpointURL}/description/`, cronExpression, {responseType: 'text'});
  }

}
