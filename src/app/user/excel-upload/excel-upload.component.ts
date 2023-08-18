import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'rroll-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent {

  fileName = ''

  constructor(private apiService: ApiService, private http: HttpClient) {}
  
  selectedFile: File | null = null;

  onFileChange(event:any) {
    console.log("FILE CHANGED:", event.target.files)
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log("UPLOAD FILE")
      const formData = new FormData();
      formData.append(this.selectedFile.name, this.selectedFile);
      console.log("form data:", formData)
      this.apiService.uploadExcelFile(formData).subscribe(
        response => console.log("File uploaded and parsed successfully."),
        error => console.error("Error uploading file")
      )
    }
    else {
      console.log("FILE UPLOAD ERROR")
    }
  }

}
