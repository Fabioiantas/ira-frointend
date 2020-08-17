import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeeFonteCadastroComponent } from './gee-fonte-cadastro.component';

describe('GeeFonteCadastroComponent', () => {
  let component: GeeFonteCadastroComponent;
  let fixture: ComponentFixture<GeeFonteCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeeFonteCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeeFonteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
