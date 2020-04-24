import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationType, Destinations } from '../../custom-classes';
import { ClipboardService } from '../../services/clipboard/clipboard.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-view-destinations',
  templateUrl: './view-destinations.component.html',
  styleUrls: ['./view-destinations.component.scss']
})
export class ViewDestinationsComponent implements OnInit {

  @Input() destinations: Destinations;
  @Input() editable: boolean = false;

  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() nbDestinations: EventEmitter<number> = new EventEmitter<number>();

  destinationsForm = new FormGroup({});

  constructor() { }

  get totalDestination(): number {
    return this.protocols().reduce((agg, protocol) => agg + this.getNbDestinationForPotocol(protocol), 0);
  }


  ngOnInit(): void {
    for (let protocol of this.protocols()) {
      this.destinationsForm.addControl(protocol, new FormArray([]));
    }
  }

  protocols(): Array<string> {
    return Object.values(DestinationType);
  }

  destinationChanged(protocol: DestinationType, event: FormGroup) {
    this.destinationsForm.removeControl(protocol);
    this.destinationsForm.addControl(protocol, event);
    this.destinationsChanged.emit(this.destinationsForm);
    this.nbDestinations.emit(this.totalDestination);
  }

  getNbDestinationForPotocol(protocol: string): number {
    if(this.editable) {
      if (this.destinationsForm.value[protocol]) {
        return this.destinationsForm.value[protocol].length;
      } else {
        return 0;
      }
    }else {
      if (this.destinations[protocol]) {
        return this.destinations[protocol].length;
      } else {
        return 0;
      }
    }
  }

}
