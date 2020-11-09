import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaItemCadastroComponent } from './auditoria-item-cadastro.component';

describe('AuditoriaItemCadastroComponent', () => {
  let component: AuditoriaItemCadastroComponent;
  let fixture: ComponentFixture<AuditoriaItemCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaItemCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaItemCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
