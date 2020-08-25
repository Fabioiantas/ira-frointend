import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoAnaliseComponent } from './processo-analise.component';

describe('ProcessoAnaliseComponent', () => {
  let component: ProcessoAnaliseComponent;
  let fixture: ComponentFixture<ProcessoAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
