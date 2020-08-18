import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonteEmissaoComponent } from './fonte-emissao.component';

describe('FonteEmissaoComponent', () => {
  let component: FonteEmissaoComponent;
  let fixture: ComponentFixture<FonteEmissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonteEmissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonteEmissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
