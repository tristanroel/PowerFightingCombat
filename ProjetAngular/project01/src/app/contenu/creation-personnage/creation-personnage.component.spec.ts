import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPersonnageComponent } from './creation-personnage.component';

describe('CreationPersonnageComponent', () => {
  let component: CreationPersonnageComponent;
  let fixture: ComponentFixture<CreationPersonnageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationPersonnageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationPersonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
