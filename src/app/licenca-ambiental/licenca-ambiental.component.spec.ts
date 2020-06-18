import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaAmbientalComponent } from './licenca-ambiental.component';

describe('LicencaAmbientalComponent', () => {
  let component: LicencaAmbientalComponent;
  let fixture: ComponentFixture<LicencaAmbientalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencaAmbientalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencaAmbientalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
