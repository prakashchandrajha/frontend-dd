import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Releasedetails6Component } from './releasedetails-6.component';

describe('Releasedetails6Component', () => {
  let component: Releasedetails6Component;
  let fixture: ComponentFixture<Releasedetails6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Releasedetails6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Releasedetails6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
