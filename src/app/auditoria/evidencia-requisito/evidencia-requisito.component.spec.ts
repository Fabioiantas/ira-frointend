import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenciaRequisitoComponent } from './evidencia-requisito.component';

describe('EvidenciaRequisitoComponent', () => {
  let component: EvidenciaRequisitoComponent;
  let fixture: ComponentFixture<EvidenciaRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenciaRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenciaRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
