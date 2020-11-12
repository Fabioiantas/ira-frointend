import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaEntidadeCadastroComponent } from './auditoria-entidade-cadastro.component';

describe('AuditoriaEntidadeCadastroComponent', () => {
  let component: AuditoriaEntidadeCadastroComponent;
  let fixture: ComponentFixture<AuditoriaEntidadeCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaEntidadeCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaEntidadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
