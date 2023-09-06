import { Component, Input, OnInit } from '@angular/core';
import { RentDataList } from './rent-data-list';
import { ApiService } from 'src/app/api/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'rroll-rent-data-list',
  templateUrl: './rent-data-list.component.html',
  styleUrls: ['./rent-data-list.component.scss'],
})
export class RentDataListComponent implements OnInit {

  @Input() dataList: RentDataList[] = []
  allDataItems: RentDataList[] = [];
  searchTerm: string = ""

  constructor(private apiService: ApiService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.apiService.loadUserDataList().subscribe(
      response => {
        console.log("Loading User Data")
        console.log("response data:", response.data)
        this.allDataItems = response.data;
        this.dataList = [...this.allDataItems]; 
      }
    )
    console.log("Data list:", this.dataList)
  }

  selectData(objectId:string) {
    console.log("Data ID selected:", objectId);
    this.router.navigate([`/data/${objectId}`])
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.dataList = [];
      return;
    }
    
    this.dataList = this.allDataItems.filter(item => 
      item.building.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
