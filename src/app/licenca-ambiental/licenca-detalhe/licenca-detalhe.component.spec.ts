import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencaDetalheComponent } from './licenca-detalhe.component';

describe('LicencaDetalheComponent', () => {
  let component: LicencaDetalheComponent;
  let fixture: ComponentFixture<LicencaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
