import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userdata: any = {};
  tokenObject: any;
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  passwordsMatch: boolean = true;
  isEditingEmail: boolean = false;
  isEditingPassword: boolean = false;
  email: string = '';
  constructor(
    private services: ServicesService,
    private messagerService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.services.refresacarToken();

    await this.getUserId();
  }

  isEditing = false;

  toggleEdit(mode: string) {
    if (mode === 'email') {
      if (this.isEditingEmail) {
        this.isEditingEmail = false;
      } else {
        this.isEditingEmail = true;
        this.isEditingPassword = false;
        this.email = this.userdata.email;
        this.newPassword = '';
        this.confirmNewPassword = '';
      }
    } else if (mode === 'password') {
      if (this.isEditingPassword) {
        this.isEditingPassword = false;
      } else {
        this.isEditingPassword = true;
        this.isEditingEmail = false;
        this.email = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      }
    }
  }



  saveChanges(mode: string) {
    this.tokenObject = localStorage.getItem('token');
    if (this.tokenObject) {
      this.tokenObject = jwt_decode(this.tokenObject);

      if (mode === 'email') {
        // Llamar al servicio para actualizar el correo electrónico
        const dataUpdate = { email: this.email };
        this.services
          .updateUser(this.tokenObject.user_id, dataUpdate)
          .subscribe({
            next: (data) => {
              this.messagerService.add({
                severity: 'success',
                summary: 'Movimiento exitoso',
                detail: 'Se logró hacer el registro ',
              });
              this.isEditingEmail = false;
            },
            error: (err) => {
              this.messagerService.add({
                severity: 'error',
                summary: 'No se pudo actualizar los datos',
                detail: 'Intente nuevamente',
              });
            },
          });
      } else if (mode === 'password') {
        // Verificar que las contraseñas coincidan
        if (this.newPassword !== this.confirmNewPassword) {
          alert('Las contraseñas no coinciden');
          return;
        }
        // Llamar al servicio para actualizar la contraseña
        const dataUpdate = {
          current_password: this.currentPassword,
          new_password: this.newPassword,
          confirm_new_password: this.confirmNewPassword,
        };
        this.services
          .updateUserPassword(this.tokenObject.user_id, dataUpdate)
          .subscribe({
            next: (data) => {
              this.messagerService.add({
                severity: 'success',
                summary: 'Movimiento exitoso',
                detail: 'Se logró hacer el registro ',
              });
              this.isEditingPassword = false;
            },
            error: (err) => {
              this.messagerService.add({
                severity: 'error',
                summary: 'No se pudo actualizar los datos',
                detail: 'Intente nuevamente',
              });
            },
          });
      }
    }
  }

  async getUserId() {
    this.tokenObject = localStorage.getItem('token');
    if (this.tokenObject) {
      this.tokenObject = jwt_decode(this.tokenObject);
      this.userdata = this.services
        .getUser(this.tokenObject.user_id)
        .subscribe({
          next: (data) => {
            this.userdata = data;
          },
          error: (err) => {
            this.messagerService.add({
              severity: 'error',
              summary: 'No se pudo cargar los datos',
              detail: 'Intente nuevamente',
            });
          },
        });
    }
  }
}
