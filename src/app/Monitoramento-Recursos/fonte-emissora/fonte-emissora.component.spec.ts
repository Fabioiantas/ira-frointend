import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonteEmissoraComponent } from './fonte-emissora.component';

describe('FonteEmissoraComponent', () => {
  let component: FonteEmissoraComponent;
  let fixture: ComponentFixture<FonteEmissoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonteEmissoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonteEmissoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
