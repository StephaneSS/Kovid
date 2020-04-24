import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { InputArg, ArgType } from '../../custom-classes'

@Component({
  selector: 'app-view-input-args',
  templateUrl: './view-input-args.component.html',
  styleUrls: ['./view-input-args.component.scss']
})
export class ViewInputArgsComponent implements OnInit {

  @Input() arguments: InputArg[];
  @Input() editable: boolean = false;
  @Output() argumentsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  argumentTypes = ArgType;
  argumentsForm: FormGroup = new FormGroup({
    'addArgument': this.createArgumentFormControl({
      key: '',
      order: 0,
      type: ArgType.TEXT,
      value: ''
    }, false),
    'arguments': new FormArray([])
  });

  get argumentControles(): FormArray {
    return this.argumentsForm.get('arguments') as FormArray;
  }

  get addArgumentControl(): FormControl {
    return this.argumentsForm.get('addArgument') as FormControl;
  }

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sortArguments();
    this.initArgumentFormControl();
    this.notifyChanges();
  }

  sortArguments(): void {
    this.arguments.sort((arg1, arg2) => arg1.order - arg2.order);
  }

  createArgumentFormControl(argument: InputArg, required: boolean = true): FormGroup {
    let validators: ValidatorFn[] = [];
    if (required) {
      validators.push(Validators.required);
    }
    return this.formBuilder.group({
      ...argument,
      ... {
        key: [argument.key, validators],
        type: [argument.type, validators],
        value: [argument.value, validators],
      }
    });
  }

  initArgumentFormControl() {
    this.argumentsForm.removeControl('arguments');
    this.argumentsForm.addControl('arguments', new FormArray(this.arguments.map(elem => this.createArgumentFormControl(elem))));
    this.argumentsForm.markAllAsTouched();
  }

  removeArgument(i: number): void {
    this.arguments = this.argumentControles.value;
    this.arguments.splice(i, 1);
    this.arguments = this.arguments.map((arg, i) => { arg.order = i + 1; return arg; });
    this.initArgumentFormControl();
    this.notifyChanges();
  }

  notifyChanges(): void {
    this.argumentsChanged.emit(this.argumentsForm.get('arguments') as FormGroup);
  }

  dropArgument(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arguments, event.previousIndex, event.currentIndex);
    this.arguments = this.arguments.map((arg, i) => { arg.order = i + 1; return arg; });
    this.initArgumentFormControl();
    if (event.previousIndex !== event.currentIndex) {
      this.notifyChanges();
    }
  }

  addArgument(): void {
    if (this.addArgumentControl.valid) {
      let newArg = this.addArgumentControl.value;
      newArg.order = this.arguments.length + 1;
      this.arguments.push(newArg);
      this.initArgumentFormControl();
      this.addArgumentControl.get('key').reset();
      this.addArgumentControl.get('value').reset();
      this.notifyChanges();
    }
  }

  areSameArgType(a, b): boolean {
    return a && b && a == b;
  }

}
