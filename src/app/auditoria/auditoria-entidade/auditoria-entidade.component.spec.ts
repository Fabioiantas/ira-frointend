import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaEntidadeComponent } from './auditoria-entidade.component';

describe('AuditoriaEntidadeComponent', () => {
  let component: AuditoriaEntidadeComponent;
  let fixture: ComponentFixture<AuditoriaEntidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaEntidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
