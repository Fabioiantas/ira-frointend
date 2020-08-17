/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeeComponent } from './gee.component';

describe('GeeComponent', () => {
  let component: GeeComponent;
  let fixture: ComponentFixture<GeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
