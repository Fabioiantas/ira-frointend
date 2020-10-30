import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeParametroCadastroComponent } from './unidade-parametro-cadastro.component';

describe('UnidadeParametroCadastroComponent', () => {
  let component: UnidadeParametroCadastroComponent;
  let fixture: ComponentFixture<UnidadeParametroCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeParametroCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeParametroCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
