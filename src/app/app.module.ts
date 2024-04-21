import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistryComponent } from './registry/registry.component';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './courseguard/auth-guard.service';
import { Authservice } from './courseguard/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';

import { MatDialogModule } from '@angular/material/dialog';
import { ComponenteModule } from './componentes/componente.module';
import { DialogModule } from 'primeng/dialog';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],

  },
  {
    path: 'Registry',
    component: RegistryComponent,
     canActivate: [AuthGuardService],
  },]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistryComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PasswordModule,
    HttpClientModule,
    ButtonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    CheckboxModule,
    PasswordModule,
    ToastModule,
  MatDialogModule,
    DialogModule,
  ComponenteModule,
  DialogModule,
  TableModule,
  CardModule,

  ],
  providers: [MessageService, ConfirmationService, AuthGuardService, Authservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
