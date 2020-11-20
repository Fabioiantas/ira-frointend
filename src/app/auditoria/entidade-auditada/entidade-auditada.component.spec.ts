import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadeAuditadaComponent } from './entidade-auditada.component';

describe('EntidadeAuditadaComponent', () => {
  let component: EntidadeAuditadaComponent;
  let fixture: ComponentFixture<EntidadeAuditadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntidadeAuditadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadeAuditadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
