import { Component, Input, OnInit } from '@angular/core';
import { UnitVacancy } from '../data-visualization';
import { UnitTypeStats } from '../data-visualization';
import * as d3 from 'd3'

@Component({
  selector: 'rroll-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss']
})

export class VacancyComponent {

  @Input() unitVacancy: UnitVacancy[] = [];

  unitTypeVacany: UnitTypeStats[] = [];

  individualizedData: { unitType: string, type: string, value: number }[] = [];

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
    this.unitTypeVacany.forEach(entry => {
      this.individualizedData.push(
        { unitType: entry.unitType, type: 'occupied', value: entry.occupied },
        { unitType: entry.unitType, type: 'vacants', value: entry.vacants },
        { unitType: entry.unitType, type: 'moveOuts', value: entry.moveOuts },
      );
    });
    console.log(this.individualizedData)
    this.initializeChart(this.individualizedData)
  }

  initializeChart(data: { unitType: string, type: string, value: number }[]): void {
    const svgWidth = 800;
    const svgHeight = 500;
    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("rroll-vacancy").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]); // Colors for vacants, moveOuts, and occupied respectively

    const categories = Array.from(new Set(data.map(d => d.unitType)));
    const types = Array.from(new Set(data.map(d => d.type)));

    const keys = types; // directly use types

    // Preprocess data for stacking
    let processedData: any[] = categories.map(cat => {
        let obj: any = { unitType: cat };
        data.filter(d => d.unitType === cat).forEach(d => {
            obj[d.type] = d.value;
        });
        return obj;
    });

    const stackedData = d3.stack().keys(keys)(processedData);

    const x0 = d3.scaleBand()
        .domain(categories)
        .rangeRound([0, width])
        .paddingInner(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1])) || 0])
        .rangeRound([height, 0]).nice();

    // Draw the stacked bars
    g.selectAll("g")
        .data(stackedData)
        .enter().append("g")
        .attr("fill", d => z(d.key) as string) 
        .selectAll("rect")
        .data(d => d)
        .enter().append("rect")
        .attr("x", d => x0(String(d.data['unitType']))!)
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x0.bandwidth());

    // Draw the Axes
    g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x0));

    const lastTick = y.ticks().pop();

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(lastTick ? lastTick : 0) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Number of Units");

    // Draw the legend
    const legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(types.slice().reverse())
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", d => z(d) as string);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => d);
}


}