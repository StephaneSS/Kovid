import { Component, Inject, Input } from '@angular/core';
import { CustomScript } from '../../../custom-classes';
import { postProcessComponent } from '../post-process';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, ValidatorFn, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-postProcess-custom-script',
  templateUrl: './custom-script.component.html',
  styleUrls: ['./custom-script.component.scss']
})
export class CustomScriptComponent extends postProcessComponent<CustomScript> {

  constructor(private readonly formBuilder: FormBuilder, private dialog: MatDialog) { super(); }

  ngOnInit(): void {
    this.formControl = new FormGroup({
      order: new FormControl(this.order, []),
    });
    this.formControl.addControl('data',this.createFormControl(this.data));
    this.formControl.markAllAsTouched();
    this.notify();
  }

  openDialog(): void {
    this.dialog.open(OutputPostProcessDialog, {
      minWidth: '90%',
      data: 'id: ' + this.data.id
    });

  }

  createFormControl(data: CustomScript): FormGroup {
    return this.formBuilder.group({
      ...data,
      ... {
        name: [data.name, [Validators.required]],
      }
    });
  }

  notify() {
    this.changed.emit(this.formControl);
  }
}

@Component({
  selector: 'dialog-overview-post-dialog',
  template: `
    <h1 mat-dialog-title>Script's content</h1>
    <div mat-dialog-content>
      <p> {{data}} </p>
    </div>
    <div mat-dialog-actions>
      <button color="warn" mat-stroked-button (click)="onCloseClick()">Close</button>
    </div>
  `,
})
export class OutputPostProcessDialog {

  constructor(
    public dialogRef: MatDialogRef<OutputPostProcessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }


}
