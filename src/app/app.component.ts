import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ApplegateLLC-Client';

  currentUser: boolean | undefined;
  registrationToggle = false;
  email = '';
  username = '';
  password = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkCurrentUser();
  }

  checkCurrentUser() {
    this.http.get('http://localhost:8000/api/user').subscribe(
      (res) => {
        this.currentUser = true;
        console.log("active user")
      },
      (error) => {
        this.currentUser = false;
        console.log("no active user")
      }
    );
  }
}
