import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaoResponsavelComponent } from './orgao-responsavel.component';

describe('OrgaoResponsavelComponent', () => {
  let component: OrgaoResponsavelComponent;
  let fixture: ComponentFixture<OrgaoResponsavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgaoResponsavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgaoResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
