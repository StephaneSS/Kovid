import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogEditReportComponent } from '../dialog-edit-report/dialog-edit-report.component';
import { Report, InputArg } from './../../custom-classes';
import { ConfirmeDialogComponent } from 'src/app/common/confirme-dialog/confirme-dialog.component';
import { ReportService } from 'src/app/services/report/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {

  @Input() report: Report;

  constructor(
    private reportService: ReportService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    /*this.dialog.open(OutputParametersDialog, {
      minWidth: '90%',
      data: this.report.output.parameters
    });*/

  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(DialogEditReportComponent, {
      width: '90%',
      disableClose: true,
      data: this.report
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.report = result;
      }
    });
  }

  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmeDialogComponent, {
      data: {
        title: 'Delete report ?',
        text: 'Are you sure you whant to delete the report ?'
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.reportService.deleteReport(this.report.id).subscribe(
          (report) => {
            this._snackBar.open("report successfully deleted", "close", {
              duration: 2000
            });
          },
          () => this._snackBar.open("Cannot delete the report the report", "close", {
            duration: 2000
          })
        )
      }
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
