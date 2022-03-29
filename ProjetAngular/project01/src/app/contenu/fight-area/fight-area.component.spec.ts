import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightAreaComponent } from './fight-area.component';

describe('FightAreaComponent', () => {
  let component: FightAreaComponent;
  let fixture: ComponentFixture<FightAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FightAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FightAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
