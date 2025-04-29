// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientUser } from '../shared/models/client-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7129/api/Auth';

  constructor(private http: HttpClient) {}

  register(user: ClientUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  clientLogin(user: ClientUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/client-login`, user);
  }

  adminLogin(user: ClientUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin-login`, user);
  }

  clientForgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/client-forgot`, { email });
  }

  adminForgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin-forgot`, { email });
  }
}
