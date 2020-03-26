import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCopyClickComponent } from './input-copy-click.component';

describe('InputCopyClickComponent', () => {
  let component: InputCopyClickComponent;
  let fixture: ComponentFixture<InputCopyClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCopyClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCopyClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
