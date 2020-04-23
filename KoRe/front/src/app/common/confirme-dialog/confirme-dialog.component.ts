import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirme-dialog',
  templateUrl: './confirme-dialog.component.html',
  styleUrls: ['./confirme-dialog.component.scss']
})
export class ConfirmeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, text: string }) { }

}
