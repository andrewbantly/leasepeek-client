import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RentRollService } from './services/rent-roll.service'
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Unit, ExcelDataRow } from '../rent-roll/rent-roll'
import * as XLSX from 'xlsx';

@Component({
  selector: 'rroll-data',
  templateUrl: './rent-roll.component.html',
  styleUrls: ['./rent-roll.component.scss']
})

export class RentRollComponent implements OnInit {
  clientName: string = "";
  totalBytes: number = 0;
  unitList: Unit[] = [];
  rents: number[] = []
  chartData: number[] = [];
  chartLabels: string[] = [];
  chartDataWithLabels: { label: string; data: number }[] = [];
  dataReady = new Subject<void>();
  

  constructor(private rentRollService: RentRollService, private http: HttpClient) { }


  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('excelFile', this.selectedFile);

      this.http
        .post('your-backend-api-url', formData)
        .subscribe((response) => {
          console.log('API Response:', response);
          // Handle the API response as needed
        });
    }
  }

  ngOnInit(): void {
    this.rentRollService.getRentRoll().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("On init request has been made");
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

  // uploadDocument(e: Event) {
  //   e.preventDefault()
  //   console.log("upload document triggered")
  //   const fileInput = document.getElementById('fileInput') as HTMLInputElement
  //   console.log(fileInput.files)
  //   if (fileInput && fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     console.log("Uploading file:", file);
  //     let formData = new FormData()
  //     formData.append('content', file)
  //     console.log("FORM DATA:");
  //     formData.forEach((value,key) => {
  //       console.log(key, value)
  //     })
  //     this.rentRollService.upload(formData).subscribe()
  //   } else {
  //     console.log("File upload error.");
  //   } 
  // }

  uploadDocument(e: Event) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Read the XLSX file
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        console.log(workbook)
        // Assume there's only one sheet in the XLSX file
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        console.log(sheet)
        // Convert the sheet data to JSON format
        const jsonData: JSON[] = XLSX.utils.sheet_to_json(sheet);
        // console.log(jsonData)
        // Convert jsonData to a JSON-compatible format using JSON.stringify

        // const jsonDataString = JSON.stringify(jsonData);
        // console.log(jsonDataString)
        // Convert jsonDataString back to JSON object using JSON.parse
        // const jsonDataObject: JSON = {data: jsonData}
        // console.log(jsonDataObject)
        // Send the JSON data to the backend

        this.rentRollService.upload(jsonData).subscribe();
      };

      reader.readAsArrayBuffer(file);
    } else {
      console.log('File upload error.');
    }
  }
  


  getData() {
    this.rentRollService.getExcelData().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Get request made");
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('request success');
          break;
        }
        case HttpEventType.Response: {
          const response = event.body.content

          console.log(response.body.content)
          break;
        }
      }
    });
  }
}  