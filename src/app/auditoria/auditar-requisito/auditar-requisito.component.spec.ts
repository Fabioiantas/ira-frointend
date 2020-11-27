import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditarRequisitoComponent } from './auditar-requisito.component';

describe('AuditarRequisitoComponent', () => {
  let component: AuditarRequisitoComponent;
  let fixture: ComponentFixture<AuditarRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditarRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditarRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
