import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoRequisitoComponent } from './classificacao-requisito.component';

describe('ClassificacaoRequisitoComponent', () => {
  let component: ClassificacaoRequisitoComponent;
  let fixture: ComponentFixture<ClassificacaoRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificacaoRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
