import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoGhgComponent } from './monitoramento-ghg.component';

describe('MonitoramentoGhgComponent', () => {
  let component: MonitoramentoGhgComponent;
  let fixture: ComponentFixture<MonitoramentoGhgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoramentoGhgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoGhgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
