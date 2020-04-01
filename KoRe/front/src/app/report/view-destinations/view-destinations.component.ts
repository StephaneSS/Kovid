import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationProtocole, Server, Destinations } from '../../custom-classes';
import { ClipboardService } from '../../services/clipboard/clipboard.service';
import { FormGroup, FormBuilder, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-destinations',
  templateUrl: './view-destinations.component.html',
  styleUrls: ['./view-destinations.component.scss']
})
export class ViewDestinationsComponent implements OnInit {

  @Input() destinations: Destinations;
  @Input() editable: boolean = false;
  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  destinationsForm = new FormGroup({});

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    for (let protocol of this.protocols().map(p => DestinationProtocole[p]) ) {
      this.destinationsForm.addControl(protocol, new FormArray([]));   
    }
  }

protocols(): Array < string > {
  return Object.keys(DestinationProtocole);
}

destinationChanged(protocol: DestinationProtocole, event: FormGroup) {
  this.destinationsForm.removeControl(protocol);
  this.destinationsForm.addControl(protocol, event);
  this.destinationsChanged.emit(this.destinationsForm);
  console.log(this.destinationsForm.get(protocol))
}

}
