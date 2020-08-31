import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoramentoCadastroComponent } from './monitoramento-cadastro.component';

describe('MonitoramentoCadastroComponent', () => {
  let component: MonitoramentoCadastroComponent;
  let fixture: ComponentFixture<MonitoramentoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoramentoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoramentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
