import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { materiaP } from '../models/interfaces';
import { ServicesService } from '../services/services.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';


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


  farmId: number = 0;
  material: string = '';
  name_registry: string = '';
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
  selectedOptionMedida: any;
  remaining_amount:string=""
  parcelaCreate: any;
  parcelaEdit: any;
  idSeedSet: number = -1;
  material_type:string[]=[];
  unit_of_measure:string[]= []
  tokenObject:any;
  materialselected:any;
  unit_selected:any;

  constructor(private services: ServicesService,
    private messagerService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
  ) { }
  async ngOnInit() {
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

    await this.getRegistry()
    this.material_type= ["Hilo", "Tela", "Cierre", "Resorte", "Aguja"]
    this.unit_of_measure= ["Metros" , "cuadrados", "Unidad", "Centimetro"]
  }

  async getRegistry(){
    this.product_materia= this.services.getallRegistry().subscribe({
      next:(response)=>{
          this.product_materia= response
      },error:(err)=>{
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error ',
          detail: 'No se trajeron registros con éxito',
        });
      }
    })
  }

  showCreateRegistry() {

    this.visibleCreateFarm = true;
  }




  onSubmit() {
    this.tokenObject=localStorage.getItem("token")

if(this.tokenObject!=null){
this.tokenObject=jwt_decode(this.tokenObject)
}
    const data = {
      name: this.name_registry,
      material_type: this.materialselected,
      remaining_amount: this.remaining_amount,
      unit_price: this.precio,
      unit_of_measure:this.unit_selected,
      user_register:this.tokenObject.user_id

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
