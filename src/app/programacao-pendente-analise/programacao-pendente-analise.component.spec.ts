import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacaoPendenteAnaliseComponent } from './programacao-pendente-analise.component';

describe('ProgramacaoPendenteAnaliseComponent', () => {
  let component: ProgramacaoPendenteAnaliseComponent;
  let fixture: ComponentFixture<ProgramacaoPendenteAnaliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacaoPendenteAnaliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacaoPendenteAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
