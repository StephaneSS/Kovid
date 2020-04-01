import { Component, OnInit, Input } from '@angular/core';
import { DestinationSFTP, Server } from 'src/app/custom-classes';
import { ClipboardService } from 'src/app/services/clipboard/clipboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-destination-sftp',
  templateUrl: './sftp.component.html',
  styleUrls: ['./sftp.component.scss']
})
export class SftpComponent implements OnInit {

  @Input() destinations: DestinationSFTP;
  @Input() editable: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
  }

  formatServerToString(server: Server): string {
    let str: string[] = [];
    str.push(server.protocol.trim(), '://');
    if (server?.user?.trim()) {
      str.push(server?.user?.trim(), '@')
    }
    str.push(server.host.trim());
    if (server?.port) {
      str.push(':', server.port.toString())
    }
    return str.join('');
  }

  formatUrlToString(server: Server, path: string): string {
    return `${this.formatServerToString(server)}/${path}`;
  }

  copyToClipboardAndNotify(inputElement: HTMLInputElement | string, valueName: string = ''): void {
    this.clipboardService.copyToClipboard(inputElement);
    this.clipboardService.notifyCopy(this._snackBar, valueName);
  }

}
