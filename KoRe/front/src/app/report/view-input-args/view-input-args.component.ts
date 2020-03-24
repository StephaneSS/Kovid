import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

enum ArgType {
  STRING = "String",
  NUMBER = "Number",
  DYNAMIC_DATE = "Dynamic Date"
}

class inputArg {
  order: number;
  name: string;
  value: any;
  type: ArgType;
}

const INPUT_ARGS: inputArg[] = [
  {
    order: 2,
    name: 'execution day',
    type: ArgType.DYNAMIC_DATE,
    value: 'D-1'
  },
  {
    order: 1,
    name: 'branch name',
    type: ArgType.STRING,
    value: 'b1'
  },
  {
    order: 3,
    name: 'queue size',
    type: ArgType.NUMBER,
    value: 7
  }
];

@Component({
  selector: 'app-view-input-args',
  templateUrl: './view-input-args.component.html',
  styleUrls: ['./view-input-args.component.scss']
})
export class ViewInputArgsComponent implements OnInit {

  arguments: inputArg[] = INPUT_ARGS;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sortArguments();
  }

  sortArguments(): void {
    this.arguments.sort((arg1, arg2) => arg1.order - arg2.order);
  }

  openCopyToClipboardSnackBar(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    this._snackBar.open("Copied to Clipboard", "Dismiss", {
      duration: 500,
    });
  }

}
