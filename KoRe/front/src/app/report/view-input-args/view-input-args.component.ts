import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from '../../services/clipboard/clipboard.service';
import { InputArg } from '../../custom-classes'

@Component({
  selector: 'app-view-input-args',
  templateUrl: './view-input-args.component.html',
  styleUrls: ['./view-input-args.component.scss']
})
export class ViewInputArgsComponent implements OnInit {

  @Input() arguments: InputArg[];

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService) { }

  ngOnInit(): void {
    this.sortArguments();
  }

  sortArguments(): void {
    this.arguments.sort((arg1, arg2) => arg1.order - arg2.order);
  }

  copyToClipboardAndNotify(inputElement: HTMLInputElement | string): void {
    this.clipboardService.copyToClipboard(inputElement);
    this.clipboardService.notifyCopy(this._snackBar);
  }

}
