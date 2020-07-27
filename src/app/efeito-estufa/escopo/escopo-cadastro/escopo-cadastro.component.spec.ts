import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscopoCadastroComponent } from './escopo-cadastro.component';

describe('EscopoCadastroComponent', () => {
  let component: EscopoCadastroComponent;
  let fixture: ComponentFixture<EscopoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscopoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscopoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
