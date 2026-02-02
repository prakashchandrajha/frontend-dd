import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfValuationAndTitleSearchReport4Component } from './details-of-valuation-and-title-search-report-4.component';

describe('DetailsOfValuationAndTitleSearchReport4Component', () => {
  let component: DetailsOfValuationAndTitleSearchReport4Component;
  let fixture: ComponentFixture<DetailsOfValuationAndTitleSearchReport4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOfValuationAndTitleSearchReport4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOfValuationAndTitleSearchReport4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
