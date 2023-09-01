import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRollBarChartComponent } from './rent-roll-bar-chart.component';

describe('RentRollBarChartComponent', () => {
  let component: RentRollBarChartComponent;
  let fixture: ComponentFixture<RentRollBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentRollBarChartComponent]
    });
    fixture = TestBed.createComponent(RentRollBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
