import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoLicencaCadastroComponent } from './tipo-licenca-cadastro.component';

describe('TipoLicencaCadastroComponent', () => {
  let component: TipoLicencaCadastroComponent;
  let fixture: ComponentFixture<TipoLicencaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoLicencaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoLicencaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
