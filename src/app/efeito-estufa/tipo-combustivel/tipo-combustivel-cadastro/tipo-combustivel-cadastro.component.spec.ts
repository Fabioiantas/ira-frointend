import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCombustivelCadastroComponent } from './tipo-combustivel-cadastro.component';

describe('TipoCombustivelCadastroComponent', () => {
  let component: TipoCombustivelCadastroComponent;
  let fixture: ComponentFixture<TipoCombustivelCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCombustivelCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCombustivelCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
