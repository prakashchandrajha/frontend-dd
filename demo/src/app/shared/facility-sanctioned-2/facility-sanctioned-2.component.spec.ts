import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySanctioned2Component } from './facility-sanctioned-2.component';

describe('FacilitySanctioned2Component', () => {
  let component: FacilitySanctioned2Component;
  let fixture: ComponentFixture<FacilitySanctioned2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitySanctioned2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitySanctioned2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
