import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export class postProcessComponent<T> implements OnInit {

  @Input() data: T;
  @Input() editable: boolean = false;
  @Input() order: number = 0;

  @Output() changed: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  formControl: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formControl = new FormGroup({
      order: new FormControl(this.order, []),
    }
    );
  }

  getOrder(): number {
    this.formControl.controls['order'].setValue(this.order);
    return this.formControl.controls['order'].value;
  }

}
