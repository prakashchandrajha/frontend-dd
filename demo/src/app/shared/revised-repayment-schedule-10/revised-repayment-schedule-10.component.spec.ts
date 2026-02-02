import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedRepaymentSchedule10Component } from './revised-repayment-schedule-10.component';

describe('RevisedRepaymentSchedule10Component', () => {
  let component: RevisedRepaymentSchedule10Component;
  let fixture: ComponentFixture<RevisedRepaymentSchedule10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisedRepaymentSchedule10Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisedRepaymentSchedule10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
