import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencasAmbientaisComponent } from './licencas-ambientais.component';

describe('LicencasAmbientaisComponent', () => {
  let component: LicencasAmbientaisComponent;
  let fixture: ComponentFixture<LicencasAmbientaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencasAmbientaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencasAmbientaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
