import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaNivelItemComponent } from './auditoria-nivel-item.component';

describe('AuditoriaNivelItemComponent', () => {
  let component: AuditoriaNivelItemComponent;
  let fixture: ComponentFixture<AuditoriaNivelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaNivelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaNivelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
