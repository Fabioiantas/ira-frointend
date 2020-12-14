import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeeEditarComponent } from './gee-editar.component';

describe('GeeEditarComponent', () => {
  let component: GeeEditarComponent;
  let fixture: ComponentFixture<GeeEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeeEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
