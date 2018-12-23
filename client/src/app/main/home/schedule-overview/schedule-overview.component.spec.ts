import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOverviewComponent } from './schedule-overview.component';

describe('ScheduleOverviewComponent', () => {
  let component: ScheduleOverviewComponent;
  let fixture: ComponentFixture<ScheduleOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
