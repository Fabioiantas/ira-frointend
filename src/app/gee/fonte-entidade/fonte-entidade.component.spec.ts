import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonteEntidadeComponent } from './fonte-entidade.component';

describe('FonteEntidadeComponent', () => {
  let component: FonteEntidadeComponent;
  let fixture: ComponentFixture<FonteEntidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonteEntidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonteEntidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
