import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRegistryComponent } from './modal-registry/modal-registry.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { MenubaruserComponent } from './menubaruser/menubaruser.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import {  ReactiveFormsModule } from '@angular/forms';

import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ModalRegistryComponent,
    MenubaruserComponent

  ],
  imports: [
    CommonModule,
    DialogModule,
    BrowserModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    NgbAlertModule,
    NgbModule,
    NgbPaginationModule,
  ],
  exports:[
    ModalRegistryComponent,
    MenubaruserComponent
  ]
})
export class ComponenteModule { }
