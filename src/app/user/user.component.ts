import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from './user';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'rroll-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class UserComponent implements OnInit {
  currentUser: boolean | undefined;

  userData : User = {
    username: "",
    email: ""
  };

  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router, private http: HttpClient) { }

    selectedFile: File | null = null;

  ngOnInit(): void {
    this.apiService.checkUserData().subscribe(
      (res) => {
        this.currentUser = true;
        this.userData.username = res.user.username;
      },
      (error) => {
        this.currentUser = false;
        this.router.navigate([''])
      }
    )
  }

  onFileChange(event:any) {
    console.log("FILE CHANGED:", event.target.files[0])
    this.selectedFile = <File>event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      console.log("UPLOAD FILE")
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
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



  logout() {
    console.log("logout button clicked");
    this.apiService.logoutUser().subscribe(
      (res) => {
        console.log("user should log out")
        document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.router.navigate([''])
      },
      (error) => {
        console.log("logout error")
      }
    )
  }
}