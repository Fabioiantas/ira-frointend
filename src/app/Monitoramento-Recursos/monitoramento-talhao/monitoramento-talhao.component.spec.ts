import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoTalhaoComponent } from './monitoramento-talhao.component';

describe('MonitoramentoTalhaoComponent', () => {
  let component: MonitoramentoTalhaoComponent;
  let fixture: ComponentFixture<MonitoramentoTalhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoramentoTalhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoTalhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
