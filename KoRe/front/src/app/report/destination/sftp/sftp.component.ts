import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DestinationSFTP, Server, DestinationProtocole } from 'src/app/custom-classes';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from '../../../services/clipboard/clipboard.service';
import { DestinationService } from '../../../services/destination/destination.service';

@Component({
  selector: 'app-destination-sftp',
  templateUrl: './sftp.component.html',
  styleUrls: ['./sftp.component.scss']
})
export class SftpComponent implements OnInit {

  @Input() destinations: DestinationSFTP[];
  @Input() editable: boolean = false;
  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  destinationsForm: FormGroup = new FormGroup({
    addDestination: this.createSFTPFormControl({
      server: null,
      path: ''
    }, false),
    destinations: new FormArray([])
  });

  servers: Server[] = [];

  get sftp_destinations_control(): FormArray {
    return this.destinationsForm.get('destinations') as FormArray;
  }

  get add_sftp_destinations_control(): FormArray {
    return this.destinationsForm.get('addDestination') as FormArray;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService,
    private destinationService: DestinationService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.editable) {
      this.destinationService.getServersForProtocol(DestinationProtocole.SFTP)
        .subscribe(servers => this.servers = servers);

      this.initDestinationFormControl();
      this.notifyChanges();
    }
  }

  createSFTPFormControl(destination: DestinationSFTP, required: boolean = true): FormGroup {
    let validators: ValidatorFn[] = []
    if (required) {
      validators.push(Validators.required);
    }
    return this.formBuilder.group({
      ...destination,
      ... {
        server: [destination.server, validators],
        path: [destination.path, validators]
      }
    });
  }

  initDestinationFormControl() {
    this.destinationsForm.removeControl('destinations');
    this.destinationsForm.addControl('destinations', new FormArray(this.destinations.map(elem => this.createSFTPFormControl(elem))));
    this.destinationsForm.markAllAsTouched();
  }

  removeDestination(i: number): void {
    this.destinations.splice(i, 1);
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  addDestination(): void {
    if (
      this.add_sftp_destinations_control.value.server
      && this.add_sftp_destinations_control.value.path
      && this.add_sftp_destinations_control.valid
    ) {
      // add the value
      this.destinations.unshift(this.add_sftp_destinations_control.value);
      this.initDestinationFormControl();

      // clean 'add new' field
      this.add_sftp_destinations_control.get('path').reset();
      this.add_sftp_destinations_control.markAllAsTouched();
      this.notifyChanges();

    }

  }

  notifyChanges(): void {
    this.destinationsChanged.emit(this.destinationsForm.get('destinations') as FormGroup);
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

  areServersEq(a, b) {
    return a && b && a.name == b.name;
  }

}
