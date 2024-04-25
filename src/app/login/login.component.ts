import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { Authservice } from '../courseguard/auth.service';
import { MessageService } from 'primeng/api';
import { userLogin } from '../models/interfaces';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Variables a utilizar
  public userlogin: userLogin = {
    email: '',
    password: '',
  };
  public name: any;
  public password: any;
  tokenObject: any;

  //Definicion de los objetos de rutas,servicios y mensajes que se utilizaran
  constructor(
    private usuariosService: ServicesService,
    private route: Router,
    private messageService: MessageService
  ) {}


  ngOnInit(): void {
    //En caso de ingresar a la pagina, se remueve los permisos de navegar al estar logeado

    localStorage.removeItem('token');
    localStorage.removeItem('tokenRefresh');


  }

  //Metodo que evalua los datos y define si puede continuar el usuario o no
  ingresar(event: any) {


    let body;
    let identificacionencontrada;
    //Evaluar si los campos han sido completados
    if (this.userlogin.password != '' && this.userlogin.email != '') {
      // localStorage.setItem('token', "response.tokenSessionAccess");
      // localStorage.setItem('tokenRefresh', "response.tokenSessionRefresh");
      // this.route.navigate(['../Dashboard'])
      //Envia el servicio los parametros para validar los datos
        this.usuariosService.login(this.userlogin).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access);
        localStorage.setItem('tokenRefresh', response.refresh);
        const email = this.userlogin.email
        const userName = email.split('@')[0]
        localStorage.setItem('userName', userName);
        localStorage.setItem('email', email);
        this.tokenObject = jwt_decode(response.access);
          this.usuariosService.getUser(this.tokenObject.user_id).subscribe({
            next: (data) => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Bienvenido ',
                    detail: ' ',
                  });
                  this.route.navigate(['../Registry']);

                },
                  error : (err)=>{
              console.log(err)
            }
          })
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Datos incorrectos',
          detail: 'Intente nuevamente',
        });
      },
    });
    } else {
      //En caso de no completar los campos
      this.messageService.add({
        severity: 'error',
        summary: 'Digite por favor algun dato valido',
        detail: 'ingrese datos para continuar',
      });
    }
  }
}
