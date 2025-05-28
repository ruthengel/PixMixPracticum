import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/User/login`, user)
  }

  logOut() {
    localStorage.removeItem('token')
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : null
  }
}
