import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhgCadastroComponent } from './monitoramento-ghg-cadastro.component';

describe('MonitoramentoGhgCadastroComponent', () => {
  let component: GhgCadastroComponent;
  let fixture: ComponentFixture<GhgCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhgCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhgCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
