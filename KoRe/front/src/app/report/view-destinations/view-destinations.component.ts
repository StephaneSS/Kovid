import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationProtocole, Server, Destinations } from '../../custom-classes';
import { ClipboardService } from '../../services/clipboard/clipboard.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-destinations',
  templateUrl: './view-destinations.component.html',
  styleUrls: ['./view-destinations.component.scss']
})
export class ViewDestinationsComponent implements OnInit {

  @Input() destinations: Destinations;
  @Input() editable: boolean = false;
  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  destinationProtocoles = DestinationProtocole;

  protocols(): Array<string> {
    return Object.keys(this.destinationProtocoles);
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
