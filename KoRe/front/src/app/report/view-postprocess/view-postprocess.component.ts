import { Component, Input, Output, EventEmitter, ViewContainerRef, AfterViewInit, InjectionToken, ComponentRef, OnInit } from '@angular/core';
import { PostProcess, CustomScript } from '../../custom-classes';
import { FormGroup } from '@angular/forms';
import { CustomScriptComponent } from '../postprocess/custom-script/custom-script.component';
import { ComponentPortal, Portal, CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

@Component({
  selector: 'app-view-postprocess',
  templateUrl: './view-postprocess.component.html',
  styleUrls: ['./view-postprocess.component.scss']
})
export class ViewPostprocessComponent implements OnInit, AfterViewInit {

  @Input() postProcesses: PostProcess<any>[];
  @Input() editable: boolean = false;
  @Output() postProcessesChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  newStepType: string;
  steps: ComponentRef<any>[] = [];

  constructor() { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.postProcesses.forEach(p => p.type_full = this.getPostProcessType(p.type));
  }

  /* add here you other post process types */
  getPostProcessType(type: string) {
    switch (type) {
      case 'CustomScript':
        return new ComponentPortal(CustomScriptComponent);
    }
  }
  getNewEmptyPostProcess(type: string) {
    switch (type) {
      case 'CustomScript':
        return new CustomScript();
    }
  }

  initPortal<T>(i: number, ref: CdkPortalOutletAttachedRef) {
    ref = ref as ComponentRef<T>;
    ref.instance.data = this.postProcesses[i].data;
    ref.instance.order = i + 1;
    ref.instance.editable = this.editable;
    ref.instance.changed.subscribe((data) => console.log('TODO', data));
    this.steps[i] = ref;
  }

  addStep(stepType: string): void{
    this.postProcesses.push({
      type: stepType,
      type_full: this.getPostProcessType(stepType),
      data: this.getNewEmptyPostProcess(stepType),
      order: this.postProcesses.length+1
    });
  }

  removeStep(i: number){
    this.postProcesses.splice(i,1);
    this.steps[i].instance.changed.unsubscribe();
    this.steps.splice(i,1);
    this.postProcesses.forEach((p,i) => {
      p.order=i+1;
      this.steps[i].instance.order = i+1;
    } );
    this.notifyChanges();

  }

  notifyChanges(): void{
    this.postProcessesChanged.emit(/* TODO */);
  }

  dropArgument(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.postProcesses, event.previousIndex, event.currentIndex);
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
    this.postProcesses.forEach((p,i) => {
      p.order=i+1;
      this.steps[i].instance.order = i+1;
    } );
    //this.initFormControl();
  }

}
