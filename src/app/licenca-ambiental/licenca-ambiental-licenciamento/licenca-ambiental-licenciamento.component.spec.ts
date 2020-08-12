import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciamentoComponent } from './licenca-ambiental-licenciamento.component';

describe('LicencaAmbientalLicenciamentoComponent', () => {
  let component: LicenciamentoComponent;
  let fixture: ComponentFixture<LicenciamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenciamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
