import { Component, OnInit, Input } from '@angular/core';
import { DestinationFOLDER } from 'src/app/custom-classes';

@Component({
  selector: 'app-destination-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input() destinations: DestinationFOLDER;
  @Input() editable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
 