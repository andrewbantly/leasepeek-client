import { Component, Input, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'rroll-rent-roll-bar-chart',
  templateUrl: './rent-roll-bar-chart.component.html',
  styleUrls: ['./rent-roll-bar-chart.component.scss']
})
export class RentRollBarChartComponent implements AfterViewInit {
  @Input() chartData: number[] = [];
  @Input() chartLabels: string[] = [];
  chartWidth: number = window.innerWidth / 2;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    this.chartWidth = window.innerWidth / 2;
    this.createChart();
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    console.log('chartData:', this.chartData);
    console.log('chartLabels:', this.chartLabels);
    const element = this.elementRef.nativeElement;
    d3.select(element).selectAll('svg').remove();
    const svg = d3.select(element).append('svg')
      .attr('width', this.chartWidth)
      .attr('height', 400);

    // Chart dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    console.log("margin:", margin)
    console.log("width:", width)
    console.log("svg width:", +svg.attr('width'))

    const xScale = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(this.chartLabels);

    // Output the values of xScale.bandwidth() and this.chartLabels
    console.log('xScale.bandwidth():', xScale.bandwidth());
    console.log('this.chartLabels:', this.chartLabels);

    const filteredChartData = this.chartData.filter(d => typeof d === 'number');

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(filteredChartData) || 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.selectAll('.bar')
      .data(this.chartData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(this.chartLabels[i]) || 0)
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d));

    g.selectAll('.bar-label')
      .data(this.chartData)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d, i) => xScale(this.chartLabels[i]) || 0 + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d) - 5) // Adjust the vertical position based on your preference
      .text(d => d)
      .attr('text-anchor', 'middle') // Center the label on the bar
      .attr('font-size', '12px') // Adjust font size based on your preference
      .attr('fill', 'black'); // Adjust label color based on your preference
  }
}
