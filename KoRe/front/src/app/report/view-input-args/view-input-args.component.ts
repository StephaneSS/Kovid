import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
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
      name: '',
      order: 0,
      type: ArgType.STRING,
      value: ''
    }),
    'arguments': new FormArray([])
  });

  get argumentControles(): FormArray {
    return this.argumentsForm.get("arguments") as FormArray;
  }

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sortArguments();
    this.initArgumentFormControl();
  }

  sortArguments(): void {
    this.arguments.sort((arg1, arg2) => arg1.order - arg2.order);
  }

  createArgumentFormControl(argument: InputArg): FormGroup {
    return this.formBuilder.group({
      ...argument,
      ... {
        name: [argument.name, Validators.required]
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

}
