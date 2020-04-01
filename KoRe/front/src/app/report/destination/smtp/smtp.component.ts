import { Component, OnInit, Input } from '@angular/core';
import { DestinationSMTP } from 'src/app/custom-classes';

@Component({
  selector: 'app-destination-smtp',
  templateUrl: './smtp.component.html',
  styleUrls: ['./smtp.component.scss']
})
export class SmtpComponent implements OnInit {

  @Input() destinations: DestinationSMTP[];
  @Input() editable: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
