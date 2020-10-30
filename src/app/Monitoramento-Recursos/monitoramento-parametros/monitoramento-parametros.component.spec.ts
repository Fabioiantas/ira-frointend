import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoParametrosComponent } from './monitoramento-parametros.component';

describe('MonitoramentoParametrosComponent', () => {
  let component: MonitoramentoParametrosComponent;
  let fixture: ComponentFixture<MonitoramentoParametrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoramentoParametrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
