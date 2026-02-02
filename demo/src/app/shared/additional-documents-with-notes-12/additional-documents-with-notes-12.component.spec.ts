import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDocumentsWithNotes12Component } from './additional-documents-with-notes-12.component';

describe('AdditionalDocumentsWithNotes12Component', () => {
  let component: AdditionalDocumentsWithNotes12Component;
  let fixture: ComponentFixture<AdditionalDocumentsWithNotes12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalDocumentsWithNotes12Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalDocumentsWithNotes12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
