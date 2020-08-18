import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscopoCadastroGeeComponent } from './escopo-cadastro-gee.component';

describe('EscopoCadastroGeeComponent', () => {
  let component: EscopoCadastroGeeComponent;
  let fixture: ComponentFixture<EscopoCadastroGeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscopoCadastroGeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscopoCadastroGeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
