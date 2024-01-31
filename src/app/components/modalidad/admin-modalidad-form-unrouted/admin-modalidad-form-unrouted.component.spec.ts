/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminModalidadFormUnroutedComponent } from './admin-modalidad-form-unrouted.component';

describe('AdminModalidadFormUnroutedComponent', () => {
  let component: AdminModalidadFormUnroutedComponent;
  let fixture: ComponentFixture<AdminModalidadFormUnroutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModalidadFormUnroutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalidadFormUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
