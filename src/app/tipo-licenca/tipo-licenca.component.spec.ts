import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoLicencaComponent } from './tipo-licenca.component';

describe('TipoLicencaComponent', () => {
  let component: TipoLicencaComponent;
  let fixture: ComponentFixture<TipoLicencaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoLicencaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoLicencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
