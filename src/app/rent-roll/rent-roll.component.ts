import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RentRollService } from './services/rent-roll.service'
import { HttpEventType } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Unit } from '../rent-roll/rent-roll'


@Component({
  selector: 'rroll-data',
  templateUrl: './rent-roll.component.html',
  styleUrls: ['./rent-roll.component.scss']
})

export class RentRollComponent implements OnInit {
  clientName: string = "Sam";
  totalBytes: number = 0;
  // unitList: Array<string | number | Date> = [];
  // unitList: Array<any> = [];
  unitList: Unit[] = [];
  rents: number[] = []
  chartData: number[] = [];
  chartLabels: string[] = [];
  chartDataWithLabels: { label: string; data: number }[] = [];
  dataReady = new Subject<void>();

  constructor(private rentRollService: RentRollService) { }

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
          // this.unitList = event.body[1].Tenants;
          this.unitList = event.body[1].Tenants.map((tenant: any) => {
            const unit: Unit = {
              status: tenant.Status,
              unit: tenant.Unit,
              unitType: tenant['Unit Type'],
              unitSqFt: tenant['Unit Sq Ft'],
              resident: tenant.Resident,
              name: tenant.Name,
              marketRent: tenant['Market Rent'],
              val: tenant.VAL,
              resDeposit: tenant['Resident Deposit'],
              otherDeposit: tenant['Other Deposit'],
              moveIn: new Date(tenant['Move In']),
              leaseExp: new Date(tenant['Lease Expiration']),
              moveOut: tenant['Move Out Date'] ? new Date(tenant['Move Out Date']) : null,
              balance: tenant.Balance,
              rliab: tenant.RLIAB,
              amenf: tenant.AMENF,
              car: tenant.CAR,
              rntres: tenant.RNTRES,
              total: tenant.Total,
            };
            return unit;
          });
          console.log("Response:")
          console.log(this.unitList)
          this.prepareChartData();
        }
      }
    })
  }
  

  private prepareChartData(): void {
    const unitTypeMap = new Map<string, number>();
  
    for (const tenant of this.unitList) {
      const unitType = tenant.unitType;
      const marketRent = tenant.marketRent;
  
      if (unitTypeMap.has(unitType)) {
        unitTypeMap.set(unitType, unitTypeMap.get(unitType)! + marketRent);
      } else {
        unitTypeMap.set(unitType, marketRent);
      }
    }
  
    this.chartData = Array.from(unitTypeMap.values());
    this.chartLabels = Array.from(unitTypeMap.keys());
    this.dataReady.next();
  }

  uploadDocument() {
    console.log("upload document triggered")
  }

    
}