import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {

   }
  register(data: any):Observable<any> {
    return this.http.post(`${BaseURL}register`, data);
  }
  
  login(data: any):Observable<any> {
    return this.http.post(`${BaseURL}authenticate`, data);
  }
  updateProfile(data: any):Observable<any> {
    const headers= new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.patch(`${BaseURL}users`, data,{headers: headers});
  }
  getProfile(data: any):Observable<any> {
    const headers= new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.get(`${BaseURL}current`,{headers: headers});
  }
}
