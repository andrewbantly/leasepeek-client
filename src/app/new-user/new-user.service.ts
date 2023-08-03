import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Appconfig } from '../AppConfig/appconfig';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { NewUser } from './new-user';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config: Appconfig, private http: HttpClient) { }
 
  login(user: NewUser) {
    console.log("user", user)
    // return this.http.post<Login>(`http://127.0.0.1:8000/api/users/`, user)
  }
}