/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminModalidadEditRoutedComponent } from './admin-modalidad-edit-routed.component';

describe('AdminModalidadEditRoutedComponent', () => {
  let component: AdminModalidadEditRoutedComponent;
  let fixture: ComponentFixture<AdminModalidadEditRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModalidadEditRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalidadEditRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
