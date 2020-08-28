import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoAnaliseCadastroComponent } from './processo-analise-cadastro.component';

describe('ProcessoAnaliseCadastroComponent', () => {
  let component: ProcessoAnaliseCadastroComponent;
  let fixture: ComponentFixture<ProcessoAnaliseCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoAnaliseCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoAnaliseCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
