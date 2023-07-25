import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRollComponent } from './rent-roll.component';

describe('RentRollComponent', () => {
  let component: RentRollComponent;
  let fixture: ComponentFixture<RentRollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentRollComponent]
    });
    fixture = TestBed.createComponent(RentRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
