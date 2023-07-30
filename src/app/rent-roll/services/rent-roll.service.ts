import { Injectable, Inject } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { Appconfig } from 'src/app/AppConfig/appconfig';
import { Unit } from '../rent-roll';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import the Observable type
import { environment } from 'src/environments/environemnt';
import { filter, map } from 'rxjs/operators'; // Import filter and map operators


@Injectable({
  providedIn: 'root'
})
export class RentRollService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config: Appconfig, private http: HttpClient) {
    console.log('api end point:');
    console.log(environment.apiEndpoint)
  }

  getRentRoll(): Observable<any> {
    const request = new HttpRequest('GET', `http://127.0.0.1:8000/example`, {
      reportProgress: true
    });
    return this.http.request(request);
  };

  upload(jsonData: JSON[]): Observable<any> {
    console.log("JSON DATA")
    const data = { data: jsonData }
    console.log(data)
    return this.http.post('http://127.0.0.1:8000/api/data/', data);
  }

  getExcelData():Observable<any> {
    const request = new HttpRequest('GET', `http://127.0.0.1:8000/api/data/3`, {
      reportProgress: true
    });
    return this.http.request(request);
  }
}





