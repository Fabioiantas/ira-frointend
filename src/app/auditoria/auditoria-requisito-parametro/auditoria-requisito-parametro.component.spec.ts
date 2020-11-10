import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaRequisitoParametroComponent } from './auditoria-requisito-parametro.component';

describe('AuditoriaRequisitoParametroComponent', () => {
  let component: AuditoriaRequisitoParametroComponent;
  let fixture: ComponentFixture<AuditoriaRequisitoParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaRequisitoParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaRequisitoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
