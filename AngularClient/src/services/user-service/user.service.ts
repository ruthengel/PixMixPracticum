import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  logIn(user: any): Observable<any> {
    return this.http.post<any>('https://pixmixserver.onrender.com/api/User/login', user)
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

}
