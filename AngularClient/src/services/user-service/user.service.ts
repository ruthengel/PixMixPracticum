import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { AuthService } from '../auth-service/auth.service';
import { userAction } from '../../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(search: string | undefined): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/User`, { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/User/delete/${userId}`, { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  updateUser(userId: number, user: userAction): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/User/update/${userId}`, user, { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }

  createUser(user: userAction): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/User/register`, user, { headers: { Authorization: `Bearer ${this.authService.getToken()}` } })
  }


}
