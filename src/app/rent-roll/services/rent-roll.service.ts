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

  upload(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace YOUR_ACCESS_TOKEN with your actual token if needed
      'Content-Type': 'application/json' // Assuming you are sending JSON data
    });
    return this.http.post('http://127.0.0.1:8000/upload', formData, { headers: headers });
  }
  



}


