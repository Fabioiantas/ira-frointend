import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaoResponsavelCadastroComponent } from './orgao-responsavel-cadastro.component';

describe('OrgaoResponsavelCadastroComponent', () => {
  let component: OrgaoResponsavelCadastroComponent;
  let fixture: ComponentFixture<OrgaoResponsavelCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgaoResponsavelCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgaoResponsavelCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
