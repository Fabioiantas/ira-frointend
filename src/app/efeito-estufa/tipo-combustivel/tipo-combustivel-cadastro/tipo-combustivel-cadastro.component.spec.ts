import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombustivelCadComponent } from './tipo-combustivel-cadastro.component';

describe('TipoCombustivelCadastroComponent', () => {
  let component: CombustivelCadComponent;
  let fixture: ComponentFixture<CombustivelCadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombustivelCadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombustivelCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
