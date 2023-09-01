import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rroll-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.scss']
})
export class DataVisualizationComponent implements OnInit {

  objectId: string | null = "";
  message: string = "";


  constructor(private route: ActivatedRoute, private apiService: ApiService, private http:HttpClient) {}

  ngOnInit(): void {
    this.objectId = this.route.snapshot.paramMap.get('objectId');
    if (this.objectId) {
      this.message = "Loading data"
      this.apiService.loadExcelData(this.objectId).subscribe(
        dataLoadResponse => {
          console.log("Data load response:", dataLoadResponse)
        }
      )
    } else {
      console.error("objectId is missing or null")
      this.message = "Error loading data"
    }
  }
}
