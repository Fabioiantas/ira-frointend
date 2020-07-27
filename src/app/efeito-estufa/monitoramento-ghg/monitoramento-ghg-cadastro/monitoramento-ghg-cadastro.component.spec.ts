import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoGhgCadastroComponent } from './monitoramento-ghg-cadastro.component';

describe('MonitoramentoGhgCadastroComponent', () => {
  let component: MonitoramentoGhgCadastroComponent;
  let fixture: ComponentFixture<MonitoramentoGhgCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoramentoGhgCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoGhgCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
