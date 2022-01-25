import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutilFormComponent } from './edit-outil-form.component';

describe('EditOutilFormComponent', () => {
  let component: EditOutilFormComponent;
  let fixture: ComponentFixture<EditOutilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOutilFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOutilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
