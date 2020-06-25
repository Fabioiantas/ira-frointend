import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaAmbientalRenovaComponent } from './licenca-ambiental-renova.component';

describe('LicencaAmbientalRenovaComponent', () => {
  let component: LicencaAmbientalRenovaComponent;
  let fixture: ComponentFixture<LicencaAmbientalRenovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencaAmbientalRenovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencaAmbientalRenovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
