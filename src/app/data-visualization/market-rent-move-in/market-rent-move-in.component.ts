import { Component, ElementRef, Input, OnInit } from '@angular/core';
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
  margin = { top: 10, bottom: 50, left: 100, right: 150 };

  constructor(private el: ElementRef) { }

  gatherRentxData(data: any[]): void {
    data.forEach(unit => {
      if (unit.moveIn && unit.marketRent) {
        const moveInDate = new Date(unit.moveIn);
        const rent = unit.marketRent;
        const unitType = unit.unitType;
        const unitNumber = unit.unit;
        this.marketRentxDate.push({
          date: moveInDate,
          marketRent: rent,
          unitType: unitType,
          unitNumber: unitNumber,
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

    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip.append('text')
      .attr('x', 10)
      .attr('dy', -10)
      .style('font-size', '12px')
      .style('font-weight', 'bold');

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
          .attr('d', line)
          .on('mouseover', (event, d) => {
            tooltip.style('display', 'block');
          })
          .on('mousemove', (event, d) => {
            const [xMouse, yMouse] = d3.pointer(event);
    
            const xValue = xScale.invert(xMouse - this.margin.left);
            // const yValue = yScale.invert(yMouse - this.margin.top);
    
            const closestPoint = d.reduce((prev, curr) => Math.abs(curr.date.getTime() - xValue.getTime()) < Math.abs(prev.date.getTime() - xValue.getTime()) ? curr : prev);
    
            tooltip.select('text')
              .text(`Unit ${closestPoint.unitNumber}: $${closestPoint.marketRent}`)
              .attr('x', xMouse)
              .attr('y', yMouse - 10);
          })
          .on('mouseout', () => {
            tooltip.style('display', 'none');
          });
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
      .attr('transform', (d, i) => `translate(${this.width - this.margin.right + 20}, ${this.margin.top + i * (legendSize + legendSpacing) + 10})`);

    legend.append('rect')
      .attr('width', legendSize)
      .attr('height', legendSize)
      .style('fill', d => colorScale(d))
      .style('stroke', d => colorScale(d));

    legend.append('text')
      .attr('x', legendSize + legendSpacing)
      .attr('y', legendSize - legendSpacing)
      .text(d => d);

    const legendTitleXPosition = this.width - this.margin.right + 55;
    const legendTitleYPosition = this.margin.top;

    svg.append('text')
      .attr('x', legendTitleXPosition)
      .attr('y', legendTitleYPosition)
      .style("text-anchor", "middle")
      .text("Floor plans");


  }

}
