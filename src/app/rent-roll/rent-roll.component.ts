import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rroll-data',
  templateUrl: './rent-roll.component.html',
  styleUrls: ['./rent-roll.component.scss']
})
export class RentRollComponent implements OnInit {
    clientName: string = "Sam"

    ngOnInit(): void {
      
    }
}
