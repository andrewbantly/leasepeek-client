import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './login.service';
import { ApiService } from '../api/api.service';
import { Login } from './login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'rroll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
})
export class LoginComponent implements OnInit {
  currentUser: boolean | undefined;
  showLoginForm: boolean = true;
  email = '';
  username = '';
  password = '';


  user : Login = {
    username: "",
    password: "",
    email: "",
  }
  message : string = "";

  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
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


  login(loginForm: NgForm) {
    console.log("user login data:", this.user)
    this.apiService.loginUser(this.user).subscribe(
      response => {
        console.log('Login response:', response);
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Login error:', error);
      }
    );
  };

  signUp(loginForm: NgForm) {
    console.log("new user data:", this.user);
      this.apiService.newUser(this.user).subscribe(
        signUpRespones => {
          console.log('Sign up response:', signUpRespones);
          const newUser = {
            email: signUpRespones.email,
            password: signUpRespones.password
          }
          this.apiService.loginUser(newUser).subscribe(
            response => {
              console.log('Login response:', response);
              this.router.navigate(['/profile']);
            },
            error => {
              console.error('Login error:', error);
            }
          )
        },
        error => {
          console.log("Sign up error", error)
        }
      )
  }

  changeForm() {
    console.log("form change")
    this.showLoginForm = !this.showLoginForm
  }

}
