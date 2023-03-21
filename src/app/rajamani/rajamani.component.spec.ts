/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RajamaniComponent } from './rajamani.component';

describe('RajamaniComponent', () => {
  let component: RajamaniComponent;
  let fixture: ComponentFixture<RajamaniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RajamaniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RajamaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
