import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscopoComponent } from './escopo.component';

describe('EscopoComponent', () => {
  let component: EscopoComponent;
  let fixture: ComponentFixture<EscopoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscopoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
