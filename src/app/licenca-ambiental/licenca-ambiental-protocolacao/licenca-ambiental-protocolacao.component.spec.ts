import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaAmbientalProtocolacaoComponent } from './licenca-ambiental-protocolacao.component';

describe('LicencaAmbientalProtocolacaoComponent', () => {
  let component: LicencaAmbientalProtocolacaoComponent;
  let fixture: ComponentFixture<LicencaAmbientalProtocolacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencaAmbientalProtocolacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencaAmbientalProtocolacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
