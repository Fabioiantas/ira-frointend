import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaEntidadeComponent } from './licenca-entidade.component';

describe('LicencaEntidadeComponent', () => {
  let component: LicencaEntidadeComponent;
  let fixture: ComponentFixture<LicencaEntidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencaEntidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencaEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
