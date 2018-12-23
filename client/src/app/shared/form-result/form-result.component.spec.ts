import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResultComponent } from './form-result.component';

describe('FormResultComponent', () => {
  let component: FormResultComponent;
  let fixture: ComponentFixture<FormResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
