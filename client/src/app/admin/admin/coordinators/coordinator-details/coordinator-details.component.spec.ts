import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorDetailsComponent } from './coordinator-details.component';

describe('CoordinatorDetailsComponent', () => {
  let component: CoordinatorDetailsComponent;
  let fixture: ComponentFixture<CoordinatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
