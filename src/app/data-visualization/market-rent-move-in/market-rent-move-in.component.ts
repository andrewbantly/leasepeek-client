import { Component, Input } from '@angular/core';
import { MarketRentXDate } from '../data-visualization';

@Component({
  selector: 'rroll-market-rent-move-in',
  templateUrl: './market-rent-move-in.component.html',
  styleUrls: ['./market-rent-move-in.component.scss']
})
export class MarketRentMoveInComponent {

  @Input() marketRentxDate: MarketRentXDate[] = [];

  gatherRentxData(data: any[]): void {
    data.forEach(unit => {
        if (unit.moveIn && unit.marketRent) {
            const moveInDate = unit.moveIn;
            const rent = unit.marketRent;
            this.marketRentxDate.push({
                date: moveInDate,
                marketRent: rent
            });
        }
    });
    this.marketRentxDate.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
  });
}


}
