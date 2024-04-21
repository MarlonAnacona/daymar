import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { materiaP } from '../models/interfaces';
import { ServicesService } from '../services/services.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})


export class RegistryComponent  implements OnInit{
  product_materia: any;
  columnas: any;
  selected_farm: any;
  produt_parcel: any=[];
  selectedParcelas: materiaP[] = [];
  token = localStorage.getItem('token')
  public visibleA: Boolean = false;
  public visibleParcel: Boolean = false;
  public visibleCreateFarm: Boolean = false;

  apiLoaded!: Observable<boolean>;
  autocomplete!: google.maps.places.Autocomplete;
  checked: boolean = false;
  address: string = '';
  map: any;
  position: any;
  display: any;
  busquedad: string = '';
  mensaje: string = '';
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };

  farmId: number = 0;
  material: string = '';
  name: string = '';
  precio: number = 0;
  cropModality: string = "";
  seedOptions: any[] = [];
  seedName: string = "";
  showProductId: number = -1;
  editVisibleParcel:boolean=false;
  specie_nameInput:string=""
  widthInput:string=""
  lengthInput:string=""
  crop_modalityInput:string=""
  selectedOption: any;

  parcelaCreate: any;
  parcelaEdit: any;
  idSeedSet: number = -1;



  constructor(private services: ServicesService,
    private messagerService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
  ) { }
  ngOnInit(): void {
    this.columnas = [
      {
        field: 'id_reigstry',
        header: 'Id de registro',
      },
      {
        field: 'name',
        header: 'nombre registro',
      },
      {
        field: 'material',
        header: 'Material de registro',
      },
      {
        field: 'price',
        header: 'Precio',
      },

    ];

    this.product_materia=[
      {
        name: "string",
        material: "string",
        price: 1500,

      }
    ]
  }

  showCreateRegistry() {

    this.visibleCreateFarm = true;
  }


  onSubmit() {

    const data = {
      id: this.farmId,
      name: this.name,
      material: this.material,
      price: this.precio,
      token: localStorage.getItem("token")
    };

    this.createRegistry(data)
  }


  createRegistry(data: any) {
    this.services.createParcela(data).subscribe({
      next: (response) => {
        this.messagerService.add({
          severity: 'success',
          summary: 'Movimiento exitoso',
          detail: 'Se logró hacer el registro ',
        });

      },
      error: (err) => {
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error ',
          detail: 'Registro no éxitoso',
        });
      },
    });
  }


  showParcel(id:any,showparcel:any){
    this.farmId = id
    this.specie_nameInput=showparcel.species_name
    this.widthInput=showparcel.width
    this.lengthInput=showparcel.length

    this.editVisibleParcel=true

  }


  registry(id: number) {
    this.services.getRegistry(id).subscribe({
      next: (data) => {
        this.produt_parcel = data


      }, error: (err) => {
        console.log(err)
      }
    })
  }


  showParcelEdit(id:any,showparcel:any){
    this.farmId = id
    this.specie_nameInput=showparcel.species_name
    this.widthInput=showparcel.width
    this.lengthInput=showparcel.length

    this.editVisibleParcel=true

  }

}
