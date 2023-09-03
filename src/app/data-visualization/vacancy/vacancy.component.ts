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
    const svgHeight = 400;
    const margin = { top: 20, right: 150, bottom: 60, left: 60 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select(".vacancy-svg-container").append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888"]);

    const categories = Array.from(new Set(data.map(d => d.unitType)));
    const types = Array.from(new Set(data.map(d => d.type)));

    const keys = types;

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

    const tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("display", "none");  // Hide by default

    tooltip.append("rect")
      .attr("width", 60)
      .attr("height", 20)
      .attr("fill", "white")
      .style("opacity", 0.8);

    tooltip.append("text")
      .attr("x", 30)  // Half of the tooltip width for centering
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

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
      .attr("width", x0.bandwidth())
      .on("mouseover", function (event, d) {
        if (this.parentNode) {
          const type = (d3.select(this.parentNode as SVGGElement).datum() as { key: string }).key;
          const coords = d3.pointer(event);
          tooltip.style("display", null);
          tooltip.attr("transform", `translate(${coords[0]},${coords[1]})`);
          tooltip.select("text").text(`${type}: ${d[1] - d[0]}`);
          // Adjusting tooltip rectangle width based on text width
          const textWidth = (tooltip.select("text").node() as SVGTextElement).getBBox().width;
          const rectWidth = textWidth + 15;
          tooltip.select("rect").attr("width", rectWidth);  // Adding a little padding

          tooltip.select("text")
            .attr("x", rectWidth / 2)  // Centered horizontally
            .attr("y", 0);  // Slightly above the vertical center

          tooltip.style("display", null)
            .attr("transform", `translate(${coords[0]},${coords[1]})`);

          // Adjusting color using the z scale
          tooltip.select("rect").style("fill", "black");
          tooltip.select("text").style("fill", z(type) as string);
          tooltip.select("text").style("text-anchor", "middle");
        }
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });



    // Draw the Axes
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    // Add X-axis title
    g.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 20) + ")") // Adjust the '20' as necessary to position your title
      .style("text-anchor", "middle")
      .text("Floor plans");

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("font-size", "14px")
      .text("Number of Units");


    const legendPadding = 20;
    const legendStartX = width + legendPadding;

    // Draw the legend
    const legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "start")  // Change the anchor point to start
      .selectAll("g")
      .data(keys) // Use the keys array directly to match the stacking order
      .enter().append("g")
      .attr("transform", (d, i) => `translate(${legendStartX},${i * 20})`);

    legend.append("rect")
      .attr("x", 0)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", d => z(d) as string);

    legend.append("text")
      .attr("x", 24) // A little padding between the rectangle and the text
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(d => d);

  }


}