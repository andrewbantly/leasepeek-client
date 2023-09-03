import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ViewChild } from '@angular/core';
import { MarketRentMoveInComponent } from './market-rent-move-in/market-rent-move-in.component';
import { VacancyComponent } from './vacancy/vacancy.component';

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
  activeGraph: string = "marketRentxMoveIn"
  @ViewChild(MarketRentMoveInComponent) marketRentMoveIn!: MarketRentMoveInComponent;
  @ViewChild(VacancyComponent) vacancy!: VacancyComponent;
  

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.objectId = this.route.snapshot.paramMap.get('objectId');
    if (this.objectId) {
      this.message = "Loading data";
      this.apiService.loadExcelData(this.objectId).subscribe(
        dataLoadResponse => {
          this.building = dataLoadResponse[0].building;
          this.asOfDate = dataLoadResponse[0].date;
          this.rentData = dataLoadResponse[0].data;
          this.marketRentMoveIn.gatherRentxData(this.rentData)
          this.vacancy.gatherVacancyData(this.rentData)
          this.message = ""
        }
      )
    } else {
      console.error("objectId is missing or null");
      this.message = "Error loading data";
    }
  }

  onTabChanged(event: any) {
      switch (event.index) {
          case 0:
              this.activeGraph = 'marketRentxMoveIn';
              break;
          case 1:
              this.activeGraph = 'vacancy';
              break;
      }
  }
  }
