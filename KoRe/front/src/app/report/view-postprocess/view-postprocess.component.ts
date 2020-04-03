import { Component, Input, Output, EventEmitter, ViewContainerRef, AfterViewInit, InjectionToken, ComponentRef, OnInit } from '@angular/core';
import { PostProcess, CustomScript, PostProc } from '../../custom-classes';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
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
  postProcessForm: FormGroup = new FormGroup({ postProcesses: new FormArray([]) });

  constructor(private readonly formBuilder: FormBuilder) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.postProcesses.forEach(p => p.type_full = this.getPostProcessType(p.type));
    this.initPostProcessFormControl();
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
    ref.instance.changed.subscribe((data) => {
      const index = data.value.order - 1;
      this.postProcesses[index].data = data.value.data;
      let form = this.postProcessForm.get('postProcesses') as FormArray;
      form.removeAt(index);
      form.insert(index, data);
      this.notifyChanges();
    });
    this.steps[i] = ref;
  }

  initPostProcessFormControl() {
    this.postProcessForm.removeControl('postProcesses');
    this.postProcessForm.addControl('postProcesses', new FormArray(this.postProcesses.map(elem => this.createPostProcessFormControl(elem))));
    this.postProcessForm.markAllAsTouched();
  }

  createPostProcessFormControl(postprocess: PostProcess<any>, required: boolean = true): FormGroup {
    let form = this.formBuilder.group({
      ...postprocess,
      ...{}
    });
    form.removeControl('type_full');
    return form;
  }

  addStep(stepType: string): void {
    if (this.newStepType) {
      this.postProcesses.push({
        type: stepType,
        type_full: this.getPostProcessType(stepType),
        data: this.getNewEmptyPostProcess(stepType),
        order: this.postProcesses.length + 1
      });
    }

    let form = this.postProcessForm.get('postProcesses') as FormArray;
    form.push(this.createPostProcessFormControl(this.postProcesses[this.postProcesses.length]));

    this.notifyChanges();
  }

  removeStep(i: number) {
    this.postProcesses.splice(i, 1);
    this.steps[i].instance.changed.unsubscribe();
    this.steps.splice(i, 1);
    this.postProcesses.forEach((p, i) => {
      p.order = i + 1;
      this.steps[i].instance.order = i + 1;
    });

    let form = this.postProcessForm.get('postProcesses') as FormArray;
    form.removeAt(i);

    this.notifyChanges();

  }

  notifyChanges(): void {
    this.postProcessesChanged.emit(this.postProcessForm);
  }

  dropStep(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.postProcesses, event.previousIndex, event.currentIndex);
      moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
      this.postProcesses.forEach((p, i) => {
        p.order = i + 1;
        this.steps[i].instance.order = i + 1;
      });

      let form = this.postProcessForm.get('postProcesses') as FormArray;
      let previous = form.at(event.previousIndex);
      form.removeAt(event.previousIndex);
      form.insert(event.currentIndex, previous);

      this.notifyChanges();
    }
  }

}
