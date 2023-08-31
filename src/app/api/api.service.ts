import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/';
  
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
    const url = `${this.baseUrl}/user/logout`;
    const headers = this.getHeaders();
    return this.http.post(url, {}, { withCredentials: true, headers });
  }
  
  
  loginUser(data: any): Observable<any> {
    const url = `${this.baseUrl}/user/login`;
    const headers = this.getHeaders();
    return this.http.post(url, data, { withCredentials: true, headers });
  }

  newUser(data:any): Observable<any> {
    const url = `${this.baseUrl}/user/register`;
    const headers = this.getHeaders();
    return this.http.post(url, data, {
      withCredentials: true, headers
    })
  }
  
  checkUserData(): Observable<any> {
    const url = `${this.baseUrl}/user/load`;
    const headers = this.getHeaders();
    console.log("get user data");
    return this.http.get(url, { withCredentials: true, headers });
  }
  
  uploadExcelFile(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/data/upload`;
    const csrfToken = this.getCSRFToken();
    const headers = new HttpHeaders({
        'X-CSRFToken': csrfToken || '',
    });
    console.log('Headers:', headers);
    return this.http.post(url, formData, { withCredentials: true, headers })
}

loadExcelData(): Observable<any> {
  const url = `${this.baseUrl}/data/read`;
  const csrfToken = this.getCSRFToken();
  const headers = new HttpHeaders({
    'X-CSRFToken': csrfToken || '',
  });
  console.log("Loading excel data")
  return this.http.get(url, { withCredentials: true, headers })
}
  
  
}