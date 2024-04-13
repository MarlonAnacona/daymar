import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRegistryComponent } from './modal-registry/modal-registry.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalRegistryComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule
  ],
  exports:[
    ModalRegistryComponent
  ]
})
export class ComponenteModule { }
