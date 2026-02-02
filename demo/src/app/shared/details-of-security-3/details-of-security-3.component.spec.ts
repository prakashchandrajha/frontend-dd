import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfSecurity3Component } from './details-of-security-3.component';

describe('DetailsOfSecurity3Component', () => {
  let component: DetailsOfSecurity3Component;
  let fixture: ComponentFixture<DetailsOfSecurity3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsOfSecurity3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsOfSecurity3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
