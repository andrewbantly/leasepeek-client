import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rroll-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent implements OnInit{

  fileName = ''

  
  constructor(private apiService: ApiService, private http: HttpClient, private router: Router) {}
  
  selectedFile: File | null = null;


  ngOnInit(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    console.log("decoded cookie:")
    console.log(decodedCookie)
  }

  onFileChange(event:any) {
    console.log("FILE CHANGED:", event.target.files)
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log("UPLOAD FILE")
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.apiService.uploadExcelFile(formData).subscribe(
        dataUploadResponse => {
          console.log(dataUploadResponse.message)
          console.log("Find object ID", dataUploadResponse)
          const rentrollID = dataUploadResponse.objectId
      this.apiService.loadExcelData(rentrollID).subscribe(
        response => {
          console.log("Data uploaded and loaded respone:", response)
          this.router.navigate([`/data/${rentrollID}`])
        }
      )
        },
        error => console.error("Error uploading file")
      )
    }
    else {
      console.log("FILE UPLOAD ERROR")
    }
  }
  loadFile() {
    console.log("Load file button clicked");
    const date = '03-27-2023'
    this.apiService.loadExcelData(date).subscribe(
      response => { 
        console.log("Data loaded:")
        console.log(response)
      },
      error => console.error("Error loading file")
    )
  }
}
