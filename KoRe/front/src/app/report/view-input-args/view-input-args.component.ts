import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inputArg } from '../../custom-classes'

@Component({
  selector: 'app-view-input-args',
  templateUrl: './view-input-args.component.html',
  styleUrls: ['./view-input-args.component.scss']
})
export class ViewInputArgsComponent implements OnInit {

  @Input() arguments: inputArg[];

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
