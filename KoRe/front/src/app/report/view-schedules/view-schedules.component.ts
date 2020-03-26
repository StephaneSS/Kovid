import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from '../../services/clipboard/clipboard.service';
import { Schedule } from '../../custom-classes';

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.scss']
})
export class ViewSchedulesComponent implements OnInit {

  @Input() schedules: Schedule[];

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService) { }

  ngOnInit(): void {
  }

  copyToClipboardAndNotify(inputElement: HTMLInputElement | string): void {
    this.clipboardService.copyToClipboard(inputElement);
    this.clipboardService.notifyCopy(this._snackBar);
  }

}
