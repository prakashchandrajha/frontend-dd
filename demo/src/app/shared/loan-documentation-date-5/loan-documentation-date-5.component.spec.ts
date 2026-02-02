import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDocumentationDate5Component } from './loan-documentation-date-5.component';

describe('LoanDocumentationDate5Component', () => {
  let component: LoanDocumentationDate5Component;
  let fixture: ComponentFixture<LoanDocumentationDate5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanDocumentationDate5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDocumentationDate5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
