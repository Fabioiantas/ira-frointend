import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoLicencaAmbientalComponent } from './arquivo-licenca-ambiental.component';

describe('ArquivoLicencaAmbientalComponent', () => {
  let component: ArquivoLicencaAmbientalComponent;
  let fixture: ComponentFixture<ArquivoLicencaAmbientalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivoLicencaAmbientalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivoLicencaAmbientalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
