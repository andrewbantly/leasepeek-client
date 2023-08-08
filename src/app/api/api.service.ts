import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  private getCSRFToken(): string | null {
    const csrfToken = document.cookie.match(/csrftoken=([^;]*)/);
    return csrfToken ? csrfToken[1] : null;
  }
  
  private getHeaders(): HttpHeaders {
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken || '',
    });
    return headers;
  }
  
  logoutUser(): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    const headers = this.getHeaders();
    console.log("logout user call");
    return this.http.post(url, { withCredentials: true, headers });
  }
  loginUser(data: any): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const headers = this.getHeaders();
    console.log("post user data")
    return this.http.post(url, data, { withCredentials: true, headers });
  }

  newUser(data:any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    const headers = this.getHeaders();
    console.log("sign up user data");
    return this.http.post(url, data, {
      withCredentials: true, headers
    })
  }

  checkUserData(): Observable<any> {
    const url = `${this.baseUrl}/user`;
    const headers = this.getHeaders();
    console.log("get user data");
    return this.http.get(url, { withCredentials: true, headers });
  }

}