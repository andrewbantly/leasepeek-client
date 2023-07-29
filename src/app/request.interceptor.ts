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
      const token = 'YOUR_ACCESS_TOKEN'; // Replace this with your actual token value or get it from a service/storage

      // Clone the request and set the "token" header
      const newRequest = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Assuming you are sending JSON data
        }
      });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
