import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from './user';

@Component({
  selector: 'rroll-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser: boolean | undefined;

  userData : User = {
    username: "",
    email: ""
  };


  
  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router, private http: HttpClient) { }


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