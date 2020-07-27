import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCombustivelComponent } from './tipo-combustivel.component';

describe('TipoCombustivelComponent', () => {
  let component: TipoCombustivelComponent;
  let fixture: ComponentFixture<TipoCombustivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCombustivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCombustivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
