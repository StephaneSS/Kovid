import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DestinationProtocole, Server, Destinations } from '../../custom-classes';
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private serverService: ServerService) { }

  getServersForProtocol(protocol: DestinationProtocole): Observable<Server[]> {
    //return Observable.create( o => o.next(SERVERS.filter(s => s.protocol === protocol)));
    return this.serverService.getServers();

  }

  getEmptyDestinations(): Destinations {
    let destinations: any = {};
    for (let protocole of Object.values(DestinationProtocole)){
      destinations[protocole] = [];
    }
    return destinations;
  }
}
