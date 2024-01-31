/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminModalidadNewRoutedComponent } from './admin-modalidad-new-routed.component';

describe('AdminModalidadNewRoutedComponent', () => {
  let component: AdminModalidadNewRoutedComponent;
  let fixture: ComponentFixture<AdminModalidadNewRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModalidadNewRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalidadNewRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
