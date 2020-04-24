import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DestinationType, Server, Destinations } from '../../custom-classes';
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private serverService: ServerService) { }

  getServersForProtocol(): Observable<Server[]> {
    return this.serverService.getServers();

  }

  getEmptyDestinations(): Destinations {
    let destinations: any = {};
    for (let protocol of Object.values(DestinationType)){
      destinations[protocol] = [];
    }
    return destinations;
  }
}
