import { Component, Input, OnInit } from '@angular/core';
import { UnitVacancy } from '../data-visualization';
import { UnitTypeStats } from '../data-visualization';
import * as d3 from 'd3'
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { stack } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';

@Component({
  selector: 'rroll-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})

export class VacancyComponent {

  @Input() unitVacancy: UnitVacancy[] = [];

  unitTypeVacany: UnitTypeStats[] = []; 

  constructor() { }

  gatherVacancyData(data: any[]): void {
    data.forEach(unit => {
      if (unit.unitType) {
        const unitType = unit.unitType;
        let vacant = false
        let moveOut = false;
        let occupied = true;
        if (unit.resident === "VACANT") {
          vacant = true
          occupied = false;
        }
        if (unit.moveOut) {
          moveOut = true;
        }
        this.unitVacancy.push({
          isVacant: vacant,
          unitType: unitType,
          moveOut: moveOut,
          isOccupied: occupied,
        })
      }
    })
    this.unitVacancy.forEach(unit => {
      const foundUnit = this.unitTypeVacany.find(u => u.unitType === unit.unitType);
      
      if (foundUnit) {
        if (unit.isVacant) {
          foundUnit.vacants += 1;
        }
        if (unit.isOccupied) {
          foundUnit.occupied += 1;
        }
        if (unit.moveOut) {
          foundUnit.moveOuts += 1;
        }
      } else {
        this.unitTypeVacany.push({
          unitType: unit.unitType,
          vacants: unit.isVacant ? 1 : 0,
          moveOuts: unit.moveOut ? 1 : 0,
          occupied: unit.isOccupied ? 1 : 0,
        });
      }
    });
    console.log(this.unitTypeVacany)
    this.initializeChart(this.unitTypeVacany)
  }

  initializeChart(data:UnitTypeStats[]): void {

  }


}