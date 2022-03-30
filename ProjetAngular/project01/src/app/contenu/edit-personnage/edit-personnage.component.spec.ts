import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonnageComponent } from './edit-personnage.component';

describe('EditPersonnageComponent', () => {
  let component: EditPersonnageComponent;
  let fixture: ComponentFixture<EditPersonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonnageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
