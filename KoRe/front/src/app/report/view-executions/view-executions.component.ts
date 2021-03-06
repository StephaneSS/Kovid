import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { saveAs } from 'file-saver';
import { Executions } from '../../custom-classes';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-view-executions',
  templateUrl: './view-executions.component.html',
  styleUrls: ['./view-executions.component.scss']
})
export class ViewExecutionsComponent implements OnInit {

  displayedColumns: string[] = ['order', 'startDate', 'endDate', 'duration', 'status', 'actionView', 'actionDowload'];

  @Input() executions: Executions[];

  dataSource = new MatTableDataSource<Executions>(this.executions);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property): string | number => {
      switch (property) {
        case 'duration':
          return item.endDate.getTime() - item.startDate.getTime();
        default: return item[property];
      }
    };
  }

  public downloadLog(logName: string): void {
    var content = "Here the content of the log " + logName;
    var filename = logName;
    var blob = new Blob([content], {
      type: "text/plain;charset=utf-8"
    });

    saveAs(blob, filename);
  }

  openDialog(logName: string): void {
    var content = "Here the content of the log " + logName;
    this.dialog.open(OutputExecutionDialog, {
      minWidth: '90%',
      data: content
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>Log's content</h1>
    <div mat-dialog-content>
      <p> {{data}} </p>
    </div>
    <div mat-dialog-actions>
      <button color="warn" mat-stroked-button (click)="onCloseClick()">Close</button>
    </div>
  `,
})
export class OutputExecutionDialog {

  constructor(
    public dialogRef: MatDialogRef<OutputExecutionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
