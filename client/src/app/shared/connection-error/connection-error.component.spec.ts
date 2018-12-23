import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionErrorComponent } from './connection-error.component';

describe('ConnectionErrorComponent', () => {
  let component: ConnectionErrorComponent;
  let fixture: ComponentFixture<ConnectionErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
