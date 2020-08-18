import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombustivelCadastroComponent } from './combustivel-cadastro.component';

describe('CombustivelCadastroComponent', () => {
  let component: CombustivelCadastroComponent;
  let fixture: ComponentFixture<CombustivelCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombustivelCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombustivelCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
