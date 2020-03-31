import { Component, OnInit, Input } from '@angular/core';
import { PostProcess } from '../../custom-classes';

@Component({
  selector: 'app-view-postprocess',
  templateUrl: './view-postprocess.component.html',
  styleUrls: ['./view-postprocess.component.scss']
})
export class ViewPostprocessComponent implements OnInit {

  @Input() postProcesses: PostProcess[];

  constructor() { }

  ngOnInit(): void {
  }

}
