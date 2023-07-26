import { Injectable, Inject } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { Appconfig } from 'src/app/AppConfig/appconfig';
import { Unit } from '../rent-roll';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import the Observable type
import { environment } from 'src/environments/environemnt';

@Injectable({
  providedIn: 'root'
})
export class RentRollService {
  unitList: Array<string | number | Date> = [];

  constructor(@Inject(APP_SERVICE_CONFIG) private config: Appconfig, private http: HttpClient) { 
    console.log('api end point:');
    console.log(this.config.apiEndPoint)
    console.log(environment.apiEndpoint)
   }

  getRentRoll(): Observable<any> {
    const request = new HttpRequest('GET', `http://127.0.0.1:8000/`, {
      reportProgress: true
    });
    return this.http.request(request);
  };



}


