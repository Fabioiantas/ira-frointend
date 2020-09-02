import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoAmostraCadastroComponent } from './monitoramento-amostra-cadastro.component';

describe('MonitoramentoAmostraCadastroComponent', () => {
  let component: MonitoramentoAmostraCadastroComponent;
  let fixture: ComponentFixture<MonitoramentoAmostraCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoramentoAmostraCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoAmostraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
