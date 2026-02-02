import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondencesDoneWithTheDefaulterSociety11Component } from './correspondences-done-with-the-defaulter-society-11.component';

describe('CorrespondencesDoneWithTheDefaulterSociety11Component', () => {
  let component: CorrespondencesDoneWithTheDefaulterSociety11Component;
  let fixture: ComponentFixture<CorrespondencesDoneWithTheDefaulterSociety11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrespondencesDoneWithTheDefaulterSociety11Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrespondencesDoneWithTheDefaulterSociety11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
