import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalRepaymentSchedule8Component } from './original-repayment-schedule-8.component';

describe('OriginalRepaymentSchedule8Component', () => {
  let component: OriginalRepaymentSchedule8Component;
  let fixture: ComponentFixture<OriginalRepaymentSchedule8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginalRepaymentSchedule8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginalRepaymentSchedule8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
