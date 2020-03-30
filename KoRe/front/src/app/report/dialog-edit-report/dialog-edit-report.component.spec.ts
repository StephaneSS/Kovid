import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditReportComponent } from './dialog-edit-report.component';

describe('DialogEditReportComponent', () => {
  let component: DialogEditReportComponent;
  let fixture: ComponentFixture<DialogEditReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
