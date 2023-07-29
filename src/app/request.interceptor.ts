import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request Interceptor', request);

    if (request.method === "POST") {
      // Get the CSRF token from the cookie (name: 'csrftoken')
      const csrfToken = this.getCookie('csrftoken');

      // Set the CSRF token in the request headers
      const headers = new HttpHeaders({
        'X-CSRFToken': csrfToken!
      });

      // Clone the request with the updated headers
      request = request.clone({ headers });
    }

    return next.handle(request);
  }

  // Helper function to get the value of a cookie
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}
