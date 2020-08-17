import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostraEditarComponent } from './amostra-editar.component';

describe('AmostraEditarComponent', () => {
  let component: AmostraEditarComponent;
  let fixture: ComponentFixture<AmostraEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmostraEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostraEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
