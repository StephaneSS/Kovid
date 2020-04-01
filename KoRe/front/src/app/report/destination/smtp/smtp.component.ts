import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DestinationSMTP } from 'src/app/custom-classes';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-destination-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.scss']
})
export class SmtpComponent implements OnInit {

  @Input() destinations: DestinationSMTP[];
  @Input() editable: boolean = false;
  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  destinationsForm: FormGroup = new FormGroup({
    addDestination: this.createSMTPFormControl({
      email: '',
      object: ''
    }, false),
    destinations: new FormArray([])
  });

  get smtp_destinations_control(): FormArray {
    return this.destinationsForm.get('destinations') as FormArray;
  }

  get add_smtp_destinations_control(): FormArray {
    return this.destinationsForm.get('addDestination') as FormArray;
  }

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  createSMTPFormControl(destination: DestinationSMTP, required: boolean = true): FormGroup {
    let validators: ValidatorFn[] = []
    if (required) {
      validators.push(Validators.required);
    }
    return this.formBuilder.group({
      ...destination,
      ... {
        email: [destination.email, validators.concat(Validators.email)],
        object: [destination.object, validators]
      }
    });
  }

  initDestinationFormControl() {
    this.destinationsForm.removeControl('destinations');
    this.destinationsForm.addControl('destinations', new FormArray(this.destinations.map(elem => this.createSMTPFormControl(elem))));
    this.destinationsForm.markAllAsTouched();
  }

  removeDestination(i: number): void{
    this.destinations.splice(i, 1);
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  addDestination(): void {
    if (this.add_smtp_destinations_control.valid) {
      // add the value
      this.destinations.unshift(this.add_smtp_destinations_control.value);
      this.initDestinationFormControl();

      // clean 'add new' field
      this.add_smtp_destinations_control.reset();
      this.add_smtp_destinations_control.markAllAsTouched();
      this.notifyChanges();

    }

  }

  notifyChanges(): void {
    this.destinationsChanged.emit(this.destinationsForm.get('destinations') as FormGroup);
  }

}
