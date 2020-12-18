import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoMonitoramentoRecursoComponent } from './arquivo-monitoramento-recurso.component';

describe('ArquivoMonitoramentoRecursoComponent', () => {
  let component: ArquivoMonitoramentoRecursoComponent;
  let fixture: ComponentFixture<ArquivoMonitoramentoRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivoMonitoramentoRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivoMonitoramentoRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
