import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhetherRestructuringRephasement9Component } from './whether-restructuring-rephasement-9.component';

describe('WhetherRestructuringRephasement9Component', () => {
  let component: WhetherRestructuringRephasement9Component;
  let fixture: ComponentFixture<WhetherRestructuringRephasement9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhetherRestructuringRephasement9Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhetherRestructuringRephasement9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
