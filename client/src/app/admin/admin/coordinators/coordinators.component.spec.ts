import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsComponent } from './coordinators.component';

describe('CoordinatorsComponent', () => {
  let component: CoordinatorsComponent;
  let fixture: ComponentFixture<CoordinatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
