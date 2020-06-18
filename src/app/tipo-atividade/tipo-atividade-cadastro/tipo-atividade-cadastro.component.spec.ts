import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAtividadeCadastroComponent } from './tipo-atividade-cadastro.component';

describe('TipoAtividadeCadastroComponent', () => {
  let component: TipoAtividadeCadastroComponent;
  let fixture: ComponentFixture<TipoAtividadeCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAtividadeCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAtividadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
