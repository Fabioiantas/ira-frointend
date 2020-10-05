import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroUnidadeComponent } from './parametro-unidade.component';

describe('ParametroUnidadeComponent', () => {
  let component: ParametroUnidadeComponent;
  let fixture: ComponentFixture<ParametroUnidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroUnidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
