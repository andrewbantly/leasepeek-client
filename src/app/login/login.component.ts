import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './login.service';
import { Login } from './login';

@Component({
  selector: 'rroll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class LoginComponent {
  user : Login = {
    username: "",
    password: "",
    type: "login",
  }
  message : string = "";

  constructor(private loginService: LoginService) { }

  login(loginForm: NgForm) {
    console.log("Login form:")
    console.log(loginForm)
    this.loginService.login(this.user).subscribe((data) => {
      console.log("LOGIN DATA")
      console.log(data)
    })
  }

}
