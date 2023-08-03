import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NewUser } from './new-user';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewUserService } from './new-user.service';

@Component({
  selector: 'rroll-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class NewUserComponent {

  constructor(private signupService: NewUserService) {}
  user : NewUser = {
    username: "",
    password: "",
    type: "new",
  }
}
