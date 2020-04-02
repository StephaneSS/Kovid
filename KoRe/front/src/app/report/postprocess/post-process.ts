import { OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class postProcessComponent<T> implements OnInit {

    @Input() data: T;
    @Input() editable: boolean = false;
    @Input() order: number = 0;

    @Output() changed: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor() { }

    ngOnInit() { }

}
