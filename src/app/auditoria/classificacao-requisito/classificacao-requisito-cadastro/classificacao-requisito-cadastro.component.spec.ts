import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoRequisitoCadastroComponent } from './classificacao-requisito-cadastro.component';

describe('ClassificacaoRequisitoCadastroComponent', () => {
  let component: ClassificacaoRequisitoCadastroComponent;
  let fixture: ComponentFixture<ClassificacaoRequisitoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificacaoRequisitoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoRequisitoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
