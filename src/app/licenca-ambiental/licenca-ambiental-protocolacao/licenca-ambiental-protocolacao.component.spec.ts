import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolacaoComponent } from './licenca-ambiental-protocolacao.component';

describe('LicencaAmbientalProtocolacaoComponent', () => {
  let component: ProtocolacaoComponent;
  let fixture: ComponentFixture<ProtocolacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
