import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaRequisitoComponent } from './auditoria-requisito.component';

describe('AuditoriaRequisitoComponent', () => {
  let component: AuditoriaRequisitoComponent;
  let fixture: ComponentFixture<AuditoriaRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
