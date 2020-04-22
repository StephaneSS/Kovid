import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DestinationFOLDER } from '../../../custom-classes';
import { FormGroup, FormArray, ValidatorFn, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-destination-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input() destinations: DestinationFOLDER[];
  @Input() editable: boolean = false;
  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  destinationsForm: FormGroup = new FormGroup({
    addDestination: this.createFOLDERFormControl({
      path: '',
      active: true
    }, false),
    destinations: new FormArray([])
  });

  get folder_destinations_control(): FormArray {
    return this.destinationsForm.get('destinations') as FormArray;
  }

  get add_folder_destinations_control(): FormArray {
    return this.destinationsForm.get('addDestination') as FormArray;
  }

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  createFOLDERFormControl(destination: DestinationFOLDER, required: boolean = true): FormGroup {
    let validators: ValidatorFn[] = []
    if (required) {
      validators.push(Validators.required);
    }
    delete destination.id;
    return this.formBuilder.group({
      ...destination,
      ... {
        path: [destination.path, validators]
      }
    });
  }

  initDestinationFormControl() {
    this.destinationsForm.removeControl('destinations');
    this.destinationsForm.addControl('destinations', new FormArray(this.destinations.map(elem => this.createFOLDERFormControl(elem))));
    this.destinationsForm.markAllAsTouched();
  }

  removeDestination(i: number): void{
    this.destinations.splice(i, 1);
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  addDestination(): void {
    if (this.add_folder_destinations_control.value.path && this.add_folder_destinations_control.valid) {
      // add the value
      this.destinations.unshift(this.add_folder_destinations_control.value);
      this.initDestinationFormControl();

      // clean 'add new' field
      this.add_folder_destinations_control.reset();
      this.add_folder_destinations_control.markAllAsTouched();
      this.notifyChanges();

    }

  }

  notifyChanges(): void {
    this.destinationsChanged.emit(this.destinationsForm.get('destinations') as FormGroup);
  }

}
