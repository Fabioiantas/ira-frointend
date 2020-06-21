import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaAmbientalCadastroComponent } from './licenca-ambiental-cadastro.component';

describe('LicencaAmbientalCadastroComponent', () => {
  let component: LicencaAmbientalCadastroComponent;
  let fixture: ComponentFixture<LicencaAmbientalCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencaAmbientalCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencaAmbientalCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
