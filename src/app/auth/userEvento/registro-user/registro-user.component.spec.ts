import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUserEventoComponent } from './registro-user.component';

describe('RegistroUserEventoComponent', () => {
  let component: RegistroUserEventoComponent;
  let fixture: ComponentFixture<RegistroUserEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUserEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUserEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
