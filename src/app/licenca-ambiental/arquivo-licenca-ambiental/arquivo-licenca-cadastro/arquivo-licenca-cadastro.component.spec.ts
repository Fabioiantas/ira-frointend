import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoLicencaCadastroComponent } from './arquivo-licenca-cadastro.component';

describe('ArquivoLicencaCadastroComponent', () => {
  let component: ArquivoLicencaCadastroComponent;
  let fixture: ComponentFixture<ArquivoLicencaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivoLicencaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivoLicencaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
