import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DestinationEmail } from 'src/app/custom-classes';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-destination-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  @Input() destinations: DestinationEmail[];
  @Input() editable: boolean = false;
  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  destinationsForm: FormGroup = new FormGroup({
    addDestination: this.createEMAILFormControl({
      sendTo: '',
      subject: '',
      active: true
    }, false),
    destinations: new FormArray([])
  });

  get email_destinations_control(): FormArray {
    return this.destinationsForm.get('destinations') as FormArray;
  }

  get add_email_destinations_control(): FormGroup {
    return this.destinationsForm.get('addDestination') as FormGroup;
  }

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  createEMAILFormControl(destination: DestinationEmail, required: boolean = true): FormGroup {
    let validators: ValidatorFn[] = []
    if (required) {
      validators.push(Validators.required);
    }
    return this.formBuilder.group({
      ...destination,
      ... {
        sendTo: [destination.sendTo, validators.concat(Validators.email)],
        subject: [destination.subject, validators]
      }
    });
  }

  initDestinationFormControl() {
    this.destinationsForm.removeControl('destinations');
    this.destinationsForm.addControl('destinations', new FormArray(this.destinations.map(elem => this.createEMAILFormControl(elem))));
    this.destinationsForm.markAllAsTouched();
  }

  removeDestination(i: number): void{
    this.destinations.splice(i, 1);
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  addDestination(): void {
    if (this.add_email_destinations_control.valid) {
      // add the value
      this.destinations.unshift(this.add_email_destinations_control.value);
      this.initDestinationFormControl();

      // clean 'add new' field
      this.add_email_destinations_control.reset();
      this.add_email_destinations_control.controls.active.setValue(true);
      this.add_email_destinations_control.markAllAsTouched();
      this.notifyChanges();

    }

  }

  notifyChanges(): void {
    this.destinationsChanged.emit(this.destinationsForm.get('destinations') as FormGroup);
  }

}
