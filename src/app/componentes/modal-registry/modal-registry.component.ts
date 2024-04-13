import { Component, Input, OnInit } from '@angular/core';
import { pedidos } from 'src/app/models/interfaces';

@Component({
  selector: 'app-modal-registry',
  templateUrl: './modal-registry.component.html',
  styleUrls: ['./modal-registry.component.css']
})

export class ModalRegistryComponent implements OnInit{
  @Input() type: string="";
  display: boolean = false;
  public visibleA: Boolean = false;
  public visibleB: Boolean = false;
  public pedidos: pedidos={

      nameProv: '',
      dateStart: '',
      dateEnd: '',
      cantidad: 0,
      precio: 0,

  }
  constructor(){}

  ngOnInit(): void {

  }
}
