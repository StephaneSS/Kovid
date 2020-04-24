import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ClipboardService } from '../../../services/clipboard/clipboard.service';
import { DestinationDirectory, Server, DestinationType } from '../../../custom-classes';
import { DestinationService } from 'src/app/services/destination/destination.service';

@Component({
  selector: 'app-destination-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() destinations: DestinationDirectory[];
  @Input() editable: boolean = false;
  @Output() destinationsChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  destinationsForm: FormGroup = new FormGroup({
    addDestination: this.createDirectoryFormControl({
      serverConnexion: {
        host: '',
        name: '',
        protocol: ''
      },
      server: null,
      path: '',
      active: true
    }, false),
    destinations: new FormArray([])
  });

  servers: Server[] = [];

  get directory_destinations_control(): FormArray {
    return this.destinationsForm.get('destinations') as FormArray;
  }

  get add_directory_destinations_control(): FormGroup {
    return this.destinationsForm.get('addDestination') as FormGroup;
  }

  constructor(
    private _snackBar: MatSnackBar,
    private clipboardService: ClipboardService,
    private destinationService: DestinationService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.editable) {
      this.destinationService.getServersForProtocol()
        .subscribe(servers => this.servers = servers);

      this.initDestinationFormControl();
      this.notifyChanges();
    }
  }

  createDirectoryFormControl(destination: DestinationDirectory, required: boolean = true): FormGroup {
    let validators: ValidatorFn[] = []
    if (required) {
      validators.push(Validators.required);
    }
    return this.formBuilder.group({
      ...destination,
      ... {
        serverConnexion: [destination.serverConnexion, validators],
        path: [destination.path, validators]
      }
    });
  }

  initDestinationFormControl() {
    this.destinationsForm.removeControl('destinations');
    this.destinationsForm.addControl('destinations', new FormArray(this.destinations.map(elem => this.createDirectoryFormControl(elem))));
    this.destinationsForm.markAllAsTouched();
  }

  removeDestination(i: number): void {
    this.destinations.splice(i, 1);
    this.initDestinationFormControl();
    this.notifyChanges();
  }

  addDestination(): void {
    if (
      this.add_directory_destinations_control.value.serverConnexion
      && this.add_directory_destinations_control.value.path
      && this.add_directory_destinations_control.valid
    ) {
      // add the value
      this.destinations.unshift(this.add_directory_destinations_control.value);
      this.initDestinationFormControl();

      // clean 'add new' field
      this.add_directory_destinations_control.get('path').reset();
      this.add_directory_destinations_control.controls.active.setValue(true);
      this.add_directory_destinations_control.markAllAsTouched();
      this.notifyChanges();

    }

  }

  notifyChanges(): void {
    this.destinationsChanged.emit(this.destinationsForm.get('destinations') as FormGroup);
  }

  formatServerToString(server: Server): string {
    let str: string[] = [];
    str.push(server?.protocol,'://');
    if (server?.username?.trim()) {
      str.push(server?.username?.trim(), '@')
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
    return a && b && a.id == b.id;
  }


}
