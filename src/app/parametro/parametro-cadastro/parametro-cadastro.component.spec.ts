import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroCadastroComponent } from './parametro-cadastro.component';

describe('ParametroCadastroComponent', () => {
  let component: ParametroCadastroComponent;
  let fixture: ComponentFixture<ParametroCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
