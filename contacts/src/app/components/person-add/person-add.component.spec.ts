/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonAddComponent } from './person-add.component';

describe('PersonAddComponent', () => {
  let component: PersonAddComponent;
  let fixture: ComponentFixture<PersonAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
