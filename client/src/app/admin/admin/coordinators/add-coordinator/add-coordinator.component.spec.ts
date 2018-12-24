import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordinatorComponent } from './add-coordinator.component';

describe('AddCoordinatorComponent', () => {
  let component: AddCoordinatorComponent;
  let fixture: ComponentFixture<AddCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
