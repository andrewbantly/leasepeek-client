import { Component, Input } from '@angular/core';
import { UnitVacancy } from '../data-visualization';

@Component({
  selector: 'rroll-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})
export class VacancyComponent {

  @Input() unitVacancy: UnitVacancy[] = [];

  constructor() {}

  gatherVacancyData(data: any[]): void {
    data.forEach(unit => {
      if (unit.unitType) {
        const unitType = unit.unitType;
        let vacant = false
        let moveOut = false;
        if (unit.resident === "VACANT") {
           vacant = true
        }
        if (unit.moveOut) {
           moveOut = true;
        }
        this.unitVacancy.push({
          isVacant: vacant,
          unitType: unitType,
          moveOut: moveOut,
        })
      }
    })
  }


}
