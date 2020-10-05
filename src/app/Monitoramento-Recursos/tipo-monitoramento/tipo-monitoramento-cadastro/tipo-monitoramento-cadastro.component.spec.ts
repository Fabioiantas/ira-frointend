import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMonitoramentoCadastroComponent } from './tipo-monitoramento-cadastro.component';

describe('TipoMonitoramentoCadastroComponent', () => {
  let component: TipoMonitoramentoCadastroComponent;
  let fixture: ComponentFixture<TipoMonitoramentoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMonitoramentoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMonitoramentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
