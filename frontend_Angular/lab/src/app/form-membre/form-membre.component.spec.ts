import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMembreComponent } from './form-membre.component';

describe('FormMembreComponent', () => {
  let component: FormMembreComponent;
  let fixture: ComponentFixture<FormMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMembreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
