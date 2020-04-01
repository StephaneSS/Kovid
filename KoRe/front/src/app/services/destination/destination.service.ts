import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DestinationProtocole, Server } from '../../custom-classes';
import { SERVERS } from '../../report/mock-server';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor() { }

  getServersForProtocol(protocol: DestinationProtocole): Observable<Server[]> {
    return Observable.create( o => o.next(SERVERS.filter(s => s.protocol === protocol)));
  }
}
