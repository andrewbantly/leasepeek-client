import { Component, ElementRef, Input } from '@angular/core';
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
  margin = { top: 10, bottom: 50, left: 100, right: 50 };

  constructor(private el: ElementRef) { }

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
    const grouped = d3.group(this.marketRentxDate, d => d.unitType);
    const legendItems = Array.from(grouped.keys()).length;
    const legendSize = 20;
    const legendSpacing = 4;
    const totalLegendHeight = legendItems * (legendSize + legendSpacing) + this.margin.bottom;
    const legendTitleGap = 25;

    this.height = 400 + totalLegendHeight;

    const svg = d3.select(this.el.nativeElement).select('.svg-container').append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    const xExtent = d3.extent(this.marketRentxDate, d => new Date(d.date));
    const yExtent = d3.extent(this.marketRentxDate, d => d.marketRent);

    const xScale = d3.scaleTime()
      .domain(xExtent as [Date, Date])
      .range([this.margin.left, this.width - this.margin.right]);

    const yScale = d3.scaleLinear()
      .domain(yExtent as [number, number])
      .range([this.height - this.margin.bottom - totalLegendHeight, this.margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(grouped.keys());

    // Drawing the x and y axes
    const formatDollar = d3.format(",");
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d => `$${formatDollar(d)}`);
    const xAxis = d3.axisBottom(xScale);

    svg.append('g')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom - totalLegendHeight})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(yAxis);


    // Drawing the lines for each unit type
    const line = d3.line<MarketRentXDate>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.marketRent));

    grouped.forEach((value, key) => {
      svg.append('path')
        .datum(value)
        .attr('fill', 'none')
        .attr('stroke', colorScale(key))
        .attr('stroke-width', 2)
        .attr('d', line);
    });

    svg.append("text")
      .attr("transform", "translate(" + (this.width / 2) + " ," + (this.height - this.margin.bottom - totalLegendHeight + 45) + ")")
      .style("text-anchor", "middle")
      .text("Move-in Date");

    const mainChartHeight = this.height - totalLegendHeight;

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", this.margin.left - 70)
      .attr("x", 0 - mainChartHeight / 2)  // Adjusted line
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Market Rent");


    const legend = svg.selectAll('.legend')
      .data(grouped.keys())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(${this.width - this.margin.right - 100}, ${this.height - totalLegendHeight + legendTitleGap + i * (legendSize + legendSpacing)})`);


    legend.append('rect')
      .attr('width', legendSize)
      .attr('height', legendSize)
      .style('fill', d => colorScale(d))
      .style('stroke', d => colorScale(d));

    legend.append('text')
      .attr('x', legendSize + legendSpacing)
      .attr('y', legendSize - legendSpacing)
      .text(d => d);

    const legendTitleYPosition = this.height - totalLegendHeight + 10;

    svg.append('text')
      .attr('x', this.width - this.margin.right - 50)  
      .attr('y', legendTitleYPosition)
      .style("text-anchor", "middle")
      .text("Floor plans");


  }

}
