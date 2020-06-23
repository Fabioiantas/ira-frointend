import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaAmbientalLicenciamentoComponent } from './licenca-ambiental-licenciamento.component';

describe('LicencaAmbientalLicenciamentoComponent', () => {
  let component: LicencaAmbientalLicenciamentoComponent;
  let fixture: ComponentFixture<LicencaAmbientalLicenciamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencaAmbientalLicenciamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencaAmbientalLicenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
