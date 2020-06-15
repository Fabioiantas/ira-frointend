import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoCadastroComponent } from './recurso-cadastro.component';

describe('RecursoCadastroComponent', () => {
  let component: RecursoCadastroComponent;
  let fixture: ComponentFixture<RecursoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
