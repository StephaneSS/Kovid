import { Component, OnInit, Input } from '@angular/core';
import { Executions } from '../../custom-classes';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-view-executions',
  templateUrl: './view-executions.component.html',
  styleUrls: ['./view-executions.component.scss']
})
export class ViewExecutionsComponent implements OnInit {

  @Input() executions: Executions[];
  constructor() { }
  ngOnInit(): void {
    
  }

  public downloadLog(logName: string): void {

    var content = "Here the content of the log " + logName;
    var filename = logName;
    var blob = new Blob([content], {
      type: "text/plain;charset=utf-8"
    });

    FileSaver.saveAs(blob, filename);
  }


  public viewFile(logName: string): void {
    
    //const doc = document; 
    //doc.location.href="./app/view_log.html"; 
    //doc.body.append ("<pre>Hello World ! </pre>");  
    //window.open("./app/view_log.html"); 
    var content = "Here the content of the log " + logName; 
    var myWindow = window.open("", "", "width=500, height=500");
    myWindow.document.write("<p>"+content+"!</p>");
    myWindow.focus();
  }
}