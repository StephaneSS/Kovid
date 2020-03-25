import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schedule } from '../../custom-classes'

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  @Input() schedules: Schedule[];

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
