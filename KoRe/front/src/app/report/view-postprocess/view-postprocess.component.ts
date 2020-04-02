import { Component, OnInit, Input, Inject } from '@angular/core';
import { PostProcess } from '../../custom-classes';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-postprocess',
  templateUrl: './view-postprocess.component.html',
  styleUrls: ['./view-postprocess.component.scss']
})
export class ViewPostprocessComponent implements OnInit {

  @Input() postProcesses: PostProcess[];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(content: string): void {
    this.dialog.open(OutputPostProcessDialog, {
      minWidth: '90%',
      data: content
    });

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