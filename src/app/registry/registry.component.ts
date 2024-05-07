import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { materiaP, materiaPcreate, serviceProduct } from '../models/interfaces';
import { ServicesService } from '../services/services.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Table } from 'primeng/table';


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
  public visibleCreateService: Boolean = false;

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
  selectedOptionServices: any;
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
  translations: any = {
    id: 'Identificación',
    material_type: 'Tipo de Material',
    name: 'Nombre',
    remaining_amount: 'Cantidad Restante',
    unit_of_measure: 'Unidad de Medida',
    unit_price: 'Precio Unitario',
    user_register: 'Usuario Registrado',
    creation_date: 'Fecha de Creación',
    delivery_date: 'Fecha de Entrega',
    service_price: 'Precio del Servicio',
    client_name: 'Nombre del Cliente',
    client_phone: 'Teléfono del Cliente',
    service_type: 'Tipo de Servicio',
    service_description: 'Descripción del Servicio',
    is_active: 'Activo'
  };

  materiaPcreate:materiaPcreate={
    name: "",
  material_type: "",
  remaining_amount: "", // Cambiado para coincidir con 'remaining_amount*'
  unit_price: "", // Cambiado para coincidir con 'unit_price*'
  unit_of_measure: "", // Cambiado para coincidir con 'unit_of_measure*'
  user_register: 0
  };
  serviceProductSelect:serviceProduct = {
    creation_date: '',
    delivery_date: '',
    service_price: 0,
    client_name: '',
    client_phone: '',
    service_type: '',
    service_description: '',
    is_active: true,
    user_register: 0
  };

  serviceProduct: serviceProduct = {
    creation_date: '',
    delivery_date: '',
    service_price: 0,
    client_name: '',
    client_phone: '',
    service_type: '',
    service_description: '',
    is_active: true,
    user_register: 0
  };
  @ViewChild('dt') dt!: Table;
  newRegistry=0;



  constructor(private services: ServicesService,
    private messagerService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
  ) {


   }
  async ngOnInit() {

    this.services.refresacarToken();

    this.material_type= ["Hilo", "Tela", "Cierre", "Resorte", "Aguja"]
    this.unit_of_measure= ["Metros" , "cuadrados", "Unidad", "Centimetro"]
  }

  async getRegistry(){
    this.product_materia= this.services.getallRegistry().subscribe({
      next:(response)=>{
          this.product_materia= response
          if (this.product_materia && this.product_materia.length > 0) {
            this.newRegistry=0;

            const keys = Object.keys(this.product_materia[0]);
            // Crear un objeto para cada clave con 'field' y 'header' con el nombre de la clave
            this.columnas = keys.map(key => ({
              field: key,
              header: this.translations[key]
            }));
          }
          if(this.product_materia.length== 0){

            this.newRegistry=-1
          }
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
    if (this.selectedOptionServices === 'Materia_prima') {
      this.visibleCreateFarm = true;

    } else if (this.selectedOptionServices === 'confeccion') {
      this.visibleCreateService=true;

    }
  }



 async  onSelectionChange() {
  this.newRegistry=0

    if (this.selectedOptionServices === 'Materia_prima') {
      this.product_materia= []
      this.columnas=[]
      await this.getRegistry()
      // Llamar al servicio para obtener los datos de la opción 1
    } else if (this.selectedOptionServices === 'confeccion') {
      // Llamar al servicio para obtener los datos de la opción 2
      this.product_materia= []
      this.columnas=[]
      await this.getRegistryConfe()
    } else if (this.selectedOptionServices === 'Reparacion') {
      // Llamar al servicio para obtener los datos de la opción 3
      this.product_materia= []
      this.columnas=[]
     // await this.getRegistryRepair()

    }
  }

  exportar() {
    if (this.selected_farm && this.selected_farm.length > 0) {
      const header = Object.keys(this.selected_farm[0]).join(',');
      const csv = this.selected_farm.map((row:any) => Object.values(row).join(',')).join('\n');
      const blob = new Blob([header + '\n' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }



  onSubmit() {
    this.tokenObject=localStorage.getItem("token")

    if(this.tokenObject!=null){
    this.tokenObject=jwt_decode(this.tokenObject)
    }

    if(this.selectedOptionServices === 'confeccion' || this.selectedOptionServices === 'Reparacion'){
      this.serviceProduct.user_register=this.tokenObject.user_id
      this.createRegistryService(this.serviceProduct)
    }else{
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

  }



  onSubmit2() {
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


  showParcelEdit( showData: any) {
    this.editVisibleParcel = true;
    console.log("asas")
    if (this.selectedOptionServices === 'Materia_prima') {

      this.materiaPcreate = showData
    } else if (this.selectedOptionServices === 'confeccion') {
      this.serviceProductSelect= showData
      }
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





  async getRegistryConfe(){
    this.product_materia= this.services.getallRegistryService().subscribe({
      next:(response)=>{
          this.product_materia= response
          if (this.product_materia && this.product_materia.length > 0) {
            this.newRegistry=0

            const keys = Object.keys(this.product_materia[0]);

            // Crear un objeto para cada clave con 'field' y 'header' con el nombre de la clave
            this.columnas = keys.map(key => ({
              field: key,
              header: this.translations[key]
            }));

          }
          if(this.product_materia.length == 0){
            this.newRegistry=-1
          }
      },error:(err)=>{
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error ',
          detail: 'No se trajeron registros con éxito',
        });
      }
    })
  }

  async getRegistryRepair(){
    this.product_materia= this.services.getallRegistry().subscribe({
      next:(response)=>{
          this.product_materia= response
          if (this.product_materia && this.product_materia.length > 0) {
            const keys = Object.keys(this.product_materia[0]);

            // Crear un objeto para cada clave con 'field' y 'header' con el nombre de la clave
            this.columnas = keys.map(key => ({
              field: key,
              header: this.translations[key]
            }));
          }
      },error:(err)=>{
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error ',
          detail: 'No se trajeron registros con éxito',
        });
      }
    })
  }


  createRegistryService(data: any) {
    this.services.createService(data).subscribe({
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

  onSubmit2MateriaPrima(){

  }

  onSubmit2Service(){

  }
}
