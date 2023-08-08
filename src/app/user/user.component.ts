import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'rroll-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser: boolean | undefined;

  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.apiService.checkUserData().subscribe(
      (res) => {
        this.currentUser = true;
        console.log("ngOnInit active user")
      },
      (error) => {
        this.currentUser = false;
        console.log("ngOnInit no active user")
      }
    )
  }
}