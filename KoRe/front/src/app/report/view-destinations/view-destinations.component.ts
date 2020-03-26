import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationProtocole, UrlLike } from '../../custom-classes';
import { ClipboardService } from '../../services/clipboard/clipboard.service';

@Component({
  selector: 'app-view-destinations',
  templateUrl: './view-destinations.component.html',
  styleUrls: ['./view-destinations.component.scss']
})
export class ViewDestinationsComponent implements OnInit {

  @Input() destinations;

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
  }

  destinationProtocoles = DestinationProtocole;

  protocols(): Array<string> {
    return Object.keys(this.destinationProtocoles);
  }

  formatUrlToString(protocole: string, data: UrlLike): string {
    return `${protocole}://${data.user}@${data.host}:${data.port}/${data.path}`;
  }

  copyToClipboardAndNotify(inputElement: HTMLInputElement | string, valueName: string = ''): void {
    this.clipboardService.copyToClipboard(inputElement);
    this.clipboardService.notifyCopy(this._snackBar, valueName);
  }

}
