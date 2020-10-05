import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMonitoramentoComponent } from './tipo-monitoramento.component';

describe('TipoMonitoramentoComponent', () => {
  let component: TipoMonitoramentoComponent;
  let fixture: ComponentFixture<TipoMonitoramentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMonitoramentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMonitoramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
