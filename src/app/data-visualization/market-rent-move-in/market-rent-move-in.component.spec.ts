import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketRentMoveInComponent } from './market-rent-move-in.component';

describe('MarketRentMoveInComponent', () => {
  let component: MarketRentMoveInComponent;
  let fixture: ComponentFixture<MarketRentMoveInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketRentMoveInComponent]
    });
    fixture = TestBed.createComponent(MarketRentMoveInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
