import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExecutionsComponent } from './view-executions.component';

describe('ViewExecutionsComponent', () => {
  let component: ViewExecutionsComponent;
  let fixture: ComponentFixture<ViewExecutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExecutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExecutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
