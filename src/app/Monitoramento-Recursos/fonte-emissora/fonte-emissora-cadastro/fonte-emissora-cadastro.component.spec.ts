import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonteEmissoraCadastroComponent } from './fonte-emissora-cadastro.component';

describe('FonteEmissoraCadastroComponent', () => {
  let component: FonteEmissoraCadastroComponent;
  let fixture: ComponentFixture<FonteEmissoraCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonteEmissoraCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonteEmissoraCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
