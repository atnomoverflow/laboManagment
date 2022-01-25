import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicationFormComponent } from './edit-publication-form.component';

describe('EditPublicationFormComponent', () => {
  let component: EditPublicationFormComponent;
  let fixture: ComponentFixture<EditPublicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPublicationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
