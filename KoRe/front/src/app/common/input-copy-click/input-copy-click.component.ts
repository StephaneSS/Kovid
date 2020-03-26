import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from '../../services/clipboard/clipboard.service';

@Component({
  selector: 'app-input-copy-click',
  templateUrl: './input-copy-click.component.html',
  styleUrls: ['./input-copy-click.component.scss']
})
export class InputCopyClickComponent implements OnInit {

  // mandatory
  @Input() value: string;
  @Input() label: string;

  // defaulted
  @Input() title: string;
  @Input() copyvalue: string;
  @Input() copyname: string;
  @Input() editable: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService) { }

  ngOnInit(): void {
    this.title = this.title || this.value ;
    this.copyvalue = this.copyvalue || this.value;
    this.copyname = this.copyname || this.label || 'Field';
  }

  copyToClipboardAndNotify(inputElement: HTMLInputElement | string, valueName: string): void {
    this.clipboardService.copyToClipboard(inputElement);
    this.clipboardService.notifyCopy(this._snackBar, valueName);
  }

}
