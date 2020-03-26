import { Component, OnInit, Input } from '@angular/core';
import { InputArg } from '../../custom-classes'

@Component({
  selector: 'app-view-input-args',
  templateUrl: './view-input-args.component.html',
  styleUrls: ['./view-input-args.component.scss']
})
export class ViewInputArgsComponent implements OnInit {

  @Input() arguments: InputArg[];

  constructor() { }

  ngOnInit(): void {
    this.sortArguments();
  }

  sortArguments(): void {
    this.arguments.sort((arg1, arg2) => arg1.order - arg2.order);
  }

}
