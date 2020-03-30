import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostprocessComponent } from './view-postprocess.component';

describe('ViewPostprocessComponent', () => {
  let component: ViewPostprocessComponent;
  let fixture: ComponentFixture<ViewPostprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPostprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
