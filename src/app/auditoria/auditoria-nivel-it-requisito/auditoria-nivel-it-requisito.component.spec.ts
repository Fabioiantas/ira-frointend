import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaNivelItRequisitoComponent } from './auditoria-nivel-it-requisito.component';

describe('AuditoriaNivelItRequisitoComponent', () => {
  let component: AuditoriaNivelItRequisitoComponent;
  let fixture: ComponentFixture<AuditoriaNivelItRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaNivelItRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaNivelItRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
