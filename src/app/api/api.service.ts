import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  private getCSRFToken(): string | null {
    const csrfToken = document.cookie.match(/csrftoken=([^;]*)/);
    return csrfToken ? csrfToken[1] : null;
  }

  private getHeaders(): HttpHeaders {
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || ''
    });
    return headers;
  }

  postData(data: any): Observable<any> {
    const url = `${this.baseUrl}/api/login`;
    const headers = this.getHeaders();
    console.log("post data working?")
    return this.http.post(url, data, { headers });
  }
}