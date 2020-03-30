import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }

  getCronDescription(cronExpression: string): Observable<string> {
    return Observable.create( o => o.next("New description from " + cronExpression));
  }

}
