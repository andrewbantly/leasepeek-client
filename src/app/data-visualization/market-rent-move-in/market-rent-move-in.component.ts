import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { MarketRentXDate } from '../data-visualization';
import * as d3 from 'd3';

@Component({
  selector: 'rroll-market-rent-move-in',
  templateUrl: './market-rent-move-in.component.html',
  styleUrls: ['./market-rent-move-in.component.scss']
})
export class MarketRentMoveInComponent {

  @Input() marketRentxDate: MarketRentXDate[] = [];

  width = 800;
  height = 400;
  margin = { top: 10, bottom: 40, left: 30, right: 30 };

  constructor(private el: ElementRef) {}

  gatherRentxData(data: any[]): void {
    data.forEach(unit => {
        if (unit.moveIn && unit.marketRent) {
            const moveInDate = unit.moveIn;
            const rent = unit.marketRent;
            const unitType = unit.unitType
            this.marketRentxDate.push({
                date: moveInDate,
                marketRent: rent,
                unitType: unitType,
            });
        }
    });
    this.marketRentxDate.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
  });
  this.initializeChart()
}

initializeChart(): void {
  // Create the SVG element
  const svg = d3.select(this.el.nativeElement).append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  
  // Setup the scales
  const xExtent = d3.extent(this.marketRentxDate, d => new Date(d.date));
  const yExtent = d3.extent(this.marketRentxDate, d => d.marketRent);

  const xScale = d3.scaleTime()
      .domain(xExtent as [Date, Date])  // type assertion here ensures xExtent is not undefined.
      .range([this.margin.left, this.width - this.margin.right]);
  
  const yScale = d3.scaleLinear()
      .domain(yExtent as [number, number]) // type assertion here ensures yExtent is not undefined.
      .range([this.height - this.margin.bottom, this.margin.top]);
  
  // Setup the axes
  const xAxis = d3.axisBottom(xScale).ticks(6);
  const yAxis = d3.axisLeft(yScale);
  
  svg.append('g')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(xAxis);

  svg.append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(yAxis);
  
  // Group data by unit type
  const grouped = d3.group(this.marketRentxDate, d => d.unitType);
  
  // Create a line generator function
  const line = d3.line<MarketRentXDate>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.marketRent));
  
  // For each group, append a path (line) to the SVG
  grouped.forEach((value, key) => {
      svg.append('path')
          .datum(value)
          .attr('fill', 'none')
          .attr('stroke', this.getColorForUnitType(key))
          .attr('stroke-width', 2)
          .attr('d', line);
  });
}

// A helper function to get color for each unit type.
// Modify as per your needs.
private getColorForUnitType(unitType: string): string {
  // A basic implementation, you can customize this
  const colorMap: { [key: string]: string } = {
      '10022ar1': 'green',
      '10011ar1': 'blue',
      '10021ar1': 'red',
      // add more mappings as needed
  };

  return colorMap[unitType] || 'gray'; // Default to gray if the unit type isn't found
}



}