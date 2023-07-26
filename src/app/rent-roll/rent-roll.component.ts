import { Component, OnInit } from '@angular/core';
import { RentRollService } from './services/rent-roll.service'
import { HttpEventType } from '@angular/common/http';
import { catchError } from 'rxjs';


@Component({
  selector: 'rroll-data',
  templateUrl: './rent-roll.component.html',
  styleUrls: ['./rent-roll.component.scss']
})

export class RentRollComponent implements OnInit {
    clientName: string = "Sam";
    totalBytes: number = 0;
    // unitList: Array<string | number | Date> = [];
    unitList: Array<any> = [];
    

    constructor(private rentRollService: RentRollService) {}

    ngOnInit(): void {
      this.rentRollService.getRentRoll().subscribe((event) => {
        switch (event.type) {
          case HttpEventType.Sent: {
            console.log("request has been made");
            break;
          }
          case HttpEventType.ResponseHeader: {
            console.log('request success');
            break;
          }
          case HttpEventType.DownloadProgress: {
            this.totalBytes += event.loaded;
            break;
          }
          case HttpEventType.Response: {
            console.log("Response:")
            console.log(event.body)
          }
        }
        this.unitList = event.body
      })
    }
}
