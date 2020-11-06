import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaNivelComponent } from './auditoria-nivel.component';

describe('AuditoriaNivelComponent', () => {
  let component: AuditoriaNivelComponent;
  let fixture: ComponentFixture<AuditoriaNivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaNivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
