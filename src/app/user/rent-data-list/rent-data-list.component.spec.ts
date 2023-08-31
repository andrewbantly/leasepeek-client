import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDataListComponent } from './rent-data-list.component';

describe('RentDataListComponent', () => {
  let component: RentDataListComponent;
  let fixture: ComponentFixture<RentDataListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentDataListComponent]
    });
    fixture = TestBed.createComponent(RentDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
