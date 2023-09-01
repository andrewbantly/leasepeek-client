import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
// import * as d3 from 'd3';
import { MarketRentXDate } from './data-visualization';

@Component({
  selector: 'rroll-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent implements OnInit {

  objectId: string | null = "";
  building: string = "";
  asOfDate: string = "";
  message: string = "";
  rentData: any[] = [];
  @Input() marketRentxDate: MarketRentXDate[] = [];
  

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.objectId = this.route.snapshot.paramMap.get('objectId');
    if (this.objectId) {
      this.message = "Loading data";
      this.apiService.loadExcelData(this.objectId).subscribe(
        dataLoadResponse => {
          console.log("Data load response:", dataLoadResponse);
          this.building = dataLoadResponse[0].building;
          this.asOfDate = dataLoadResponse[0].date;
          this.rentData = dataLoadResponse[0].data;
          console.log("true or false", this.rentData)
          this.gatherRentxData(this.rentData)
          this.message = ""
        }
      )
    } else {
      console.error("objectId is missing or null");
      this.message = "Error loading data";
    }
  }


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
