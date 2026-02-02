import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailsOfTheBorrower1Component } from './basic-details-of-the-borrower-1.component';

describe('BasicDetailsOfTheBorrower1Component', () => {
  let component: BasicDetailsOfTheBorrower1Component;
  let fixture: ComponentFixture<BasicDetailsOfTheBorrower1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicDetailsOfTheBorrower1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDetailsOfTheBorrower1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
