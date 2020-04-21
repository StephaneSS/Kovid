import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogEditReportComponent } from '../dialog-edit-report/dialog-edit-report.component';
import { Report, InputArg } from './../../custom-classes';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  @Input() report: Report;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    /*this.dialog.open(OutputParametersDialog, {
      minWidth: '90%',
      data: this.report.output.parameters
    });*/

  }

  openEditDialog(): void {
    this.dialog.open( DialogEditReportComponent, {
      width: '90%',
      disableClose: true,
      data: this.report
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>parameters</h1>
    <div mat-dialog-content>
      <app-view-input-args [arguments]="data"></app-view-input-args>
    </div>
    <div mat-dialog-actions>
      <button color="warn" mat-stroked-button (click)="onCloseClick()">Close</button>
    </div>
  `,
})
export class OutputParametersDialog {

  constructor(
    public dialogRef: MatDialogRef<OutputParametersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: InputArg[]) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
