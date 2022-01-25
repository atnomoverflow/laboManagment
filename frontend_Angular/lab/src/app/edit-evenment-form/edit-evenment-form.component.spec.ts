import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvenmentFormComponent } from './edit-evenment-form.component';

describe('EditEvenmentFormComponent', () => {
  let component: EditEvenmentFormComponent;
  let fixture: ComponentFixture<EditEvenmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEvenmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvenmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
