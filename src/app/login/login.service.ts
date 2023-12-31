import { Inject, Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environemnt';
import { Appconfig } from '../AppConfig/appconfig';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(@Inject(APP_SERVICE_CONFIG) private config: Appconfig, private http: HttpClient) { 
      console.log('api end point:');
      console.log(environment.apiEndpoint)
   }
    login(user: Login) {
      console.log("user", user)
      return this.http.post<Login>(`http://127.0.0.1:8000/api/users/`, user)
    }
}
