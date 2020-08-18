import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonteEmissaoCadastroComponent } from './fonte-emissao-cadastro.component';

describe('FonteEmissaoCadastroComponent', () => {
  let component: FonteEmissaoCadastroComponent;
  let fixture: ComponentFixture<FonteEmissaoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonteEmissaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonteEmissaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
