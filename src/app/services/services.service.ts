import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { user, userLogin } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  urlEcommerce: string = 'http://localhost:8080/';
  urlCRUD: string = 'https://weedweb-crud.onrender.com/';
  url: string = 'https://farm-api-2.onrender.com/';


  constructor(private Http: HttpClient) { }

  login(data: userLogin): Observable<any> {
    return this.Http.post(this.urlCRUD + 'users/api/SignIn', data);
  }

  userRegister(data: user) {
    return this.Http.post(this.urlCRUD + 'users/api/person', data);
  }


  getUser(id:any ): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    return this.Http.get(this.urlCRUD + 'users/api/'+ id,{headers});
  }


}
