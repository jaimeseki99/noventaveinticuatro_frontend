/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminModalidadViewRoutedComponent } from './admin-modalidad-view-routed.component';

describe('AdminModalidadViewRoutedComponent', () => {
  let component: AdminModalidadViewRoutedComponent;
  let fixture: ComponentFixture<AdminModalidadViewRoutedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModalidadViewRoutedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalidadViewRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
