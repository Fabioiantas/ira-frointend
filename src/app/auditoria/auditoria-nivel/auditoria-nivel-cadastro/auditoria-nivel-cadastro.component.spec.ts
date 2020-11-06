import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaNivelCadastroComponent } from './auditoria-nivel-cadastro.component';

describe('AuditoriaNivelCadastroComponent', () => {
  let component: AuditoriaNivelCadastroComponent;
  let fixture: ComponentFixture<AuditoriaNivelCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaNivelCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaNivelCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
