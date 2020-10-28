import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeParametroComponent } from './unidade-parametro.component';

describe('UnidadeParametroComponent', () => {
  let component: UnidadeParametroComponent;
  let fixture: ComponentFixture<UnidadeParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadeParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
