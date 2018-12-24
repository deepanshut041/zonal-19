import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsListComponent } from './coordinators-list.component';

describe('CoordinatorsListComponent', () => {
  let component: CoordinatorsListComponent;
  let fixture: ComponentFixture<CoordinatorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
