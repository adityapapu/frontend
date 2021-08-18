import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${BaseURL}users`, data);
  }
  
  login(data: any):Observable<any> {
    return this.http.post(`${BaseURL}users/login`, data);
  }
}
