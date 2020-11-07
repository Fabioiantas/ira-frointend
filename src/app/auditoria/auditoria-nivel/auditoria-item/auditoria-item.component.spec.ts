import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaItemComponent } from './auditoria-item.component';

describe('AuditoriaItemComponent', () => {
  let component: AuditoriaItemComponent;
  let fixture: ComponentFixture<AuditoriaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
