import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Environment } from 'src/app/custom-classes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  endpointURL: string = `${environment.endpoint}/environment`;

  constructor(private http: HttpClient) { }

  getEnvironments(): Observable<Environment[]> {
    return this.http.get<Environment[]>(`${this.endpointURL}/`);
  }
}
