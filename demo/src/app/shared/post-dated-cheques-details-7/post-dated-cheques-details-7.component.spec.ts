import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDatedChequesDetails7Component } from './post-dated-cheques-details-7.component';

describe('PostDatedChequesDetails7Component', () => {
  let component: PostDatedChequesDetails7Component;
  let fixture: ComponentFixture<PostDatedChequesDetails7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDatedChequesDetails7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDatedChequesDetails7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
