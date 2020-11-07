import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaRequisitoCadastroComponent } from './auditoria-requisito-cadastro.component';

describe('AuditoriaRequisitoCadastroComponent', () => {
  let component: AuditoriaRequisitoCadastroComponent;
  let fixture: ComponentFixture<AuditoriaRequisitoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaRequisitoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaRequisitoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
