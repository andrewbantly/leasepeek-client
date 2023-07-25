import { Injectable } from '@angular/core';
import { Unit } from '../rent-roll';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentRollService {
  unitList: Array<string | number | Date> = []
  

  constructor(private http: HttpClient) { 

  // Correct method declaration without the semicolon
  getRentRoll(): Observable<any> {
    const request = new HttpRequest('GET', `http://127.0.0.1:8000/`, {
      reportProgress: true
    });
    return this.http.request(request);
  }
}
