import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { materiaP, materiaPcreate, serviceProduct, user, userLogin, userdataUpdate, userdataUpdatePassword } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  urlEcommerce: string = 'http://localhost:8080/';
  urlCRUD: string = 'https://tailor-shop-backend.onrender.com/';
  url: string = 'https://tailor-shop-backend.onrender.com/';


  constructor(private Http: HttpClient) { }

  login(data: userLogin): Observable<any> {
    return this.Http.post(this.urlCRUD + 'users/api/token/', data);
  }

  userRegister(data: user) {
    return this.Http.post(this.urlCRUD + 'users/create/', data);
  }


  getUser(id:any ): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    return this.Http.get(this.urlCRUD + 'users/'+ id+'/',{headers});
  }

  updateUser(id:any, dataUpdate:userdataUpdate): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    return this.Http.put(this.urlCRUD + 'users/'+ id+'/',dataUpdate,{headers});
  }

  updateUserPassword(id:any, dataUpdate:userdataUpdatePassword): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
    return this.Http.put(this.urlCRUD + 'users/'+ id+'/change-password',dataUpdate,{headers});
  }
  tokenRefresh(): Observable<any> {
   const token={
    refresh: localStorage.getItem('tokenRefresh')
   }
    return this.Http.post(this.url+'users/api/token/refresh/',  token)
  }

  refresacarToken(){
    this.tokenRefresh().subscribe({ next: (response)=>{

      localStorage.setItem('token',response.access)
      localStorage.setItem('tokenRefresh',response.refresh)
    }})
  }

  getMonth(token:any) :Observable<any>{

    const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));
    return this.Http.get(this.url+'farms/get-farm/',{headers});
}


getStadistic(token:any, month:any) :Observable<any>{

  const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));
  return this.Http.get(this.url+'farms/get-farm/',{headers});
}

logout(): Observable<any>{
  const token={
    token: localStorage.getItem('tokenRefresh')
  }
  return this.Http.post(this.urlCRUD+'users/api/logout', token)
}

getRegistry(id:number) :Observable<any>{
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));
  return this.Http.get(this.url+'farms/get-registry?registry_id='+id,{headers});
}
getallRegistry() :Observable<any>{
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));
  return this.Http.get(this.url+'raw-materials/list-raw-materials/',{headers});
}

createParcela(data: materiaPcreate) {
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));
  return this.Http.post(this.url + 'raw-materials/create-raw-material/', data,{headers});
}
createService(data: serviceProduct) {
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));
  return this.Http.post(this.url + 'service/create-service/', data,{headers});
}

getallRegistryService() :Observable<any>{
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));
  return this.Http.get(this.url+'service/list-service/',{headers});
}

updateService(id:any, dataUpdate:any): Observable<any>{
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  return this.Http.put(this.urlCRUD +'service/update-service/'+ id+'/',dataUpdate,{headers});
}



updateMaterials(id:any, dataUpdate:any): Observable<any>{
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  return this.Http.put(this.urlCRUD + 'raw-materials/get-update-raw-material/'+ id+'/',dataUpdate,{headers});
}

deleteMaterials(id:any,data:any){
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  return this.Http.post(this.urlCRUD + 'raw-materials/delete-raw-material/'+ id+'/',data,{headers});

}
deleteServices(id:any,data:any){
  const headers = new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('token'));
  return this.Http.post(this.urlCRUD + 'service/delete-service/'+ id+'/',data,{headers});

}

}
