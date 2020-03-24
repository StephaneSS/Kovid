import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInputArgsComponent } from './view-input-args.component';

describe('ViewInputArgsComponent', () => {
  let component: ViewInputArgsComponent;
  let fixture: ComponentFixture<ViewInputArgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInputArgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInputArgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
