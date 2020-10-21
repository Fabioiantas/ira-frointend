import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalhaoCadastroComponent } from './talhao-cadastro.component';

describe('TalhaoCadastroComponent', () => {
  let component: TalhaoCadastroComponent;
  let fixture: ComponentFixture<TalhaoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalhaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalhaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
