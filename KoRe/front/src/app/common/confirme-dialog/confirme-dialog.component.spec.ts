import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeDialogComponent } from './confirme-dialog.component';

describe('ConfirmeDialogComponent', () => {
  let component: ConfirmeDialogComponent;
  let fixture: ComponentFixture<ConfirmeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
