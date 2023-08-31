import { Component, Input, OnInit } from '@angular/core';
import { RentDataList } from './rent-data-list';
import { ApiService } from 'src/app/api/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rroll-rent-data-list',
  templateUrl: './rent-data-list.component.html',
  styleUrls: ['./rent-data-list.component.scss']
})
export class RentDataListComponent implements OnInit {

  @Input() dataList: RentDataList[] = []

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.apiService.loadUserDataList().subscribe(
      response => {
        console.log("Loading User Data")
        console.log("response data:", response.data)
        this.dataList = response.data
      }
    )
  }

}
