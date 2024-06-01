import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GetservicesProcces, Process, materiaP, materiaPcreate, processRegister, serviceProduct, serviceRawMaterial, servicesProcces, userdata, userdataRegistry } from '../models/interfaces';
import { ServicesService } from '../services/services.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css'],
  providers: [MessageService,ConfirmationService]

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
  public visibleCreateUser: Boolean = false;
  serviceProductSelectOriginal:any;

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
    is_active: 'Activo',
    amount_service: 'Cantidad',
    service_unit_price:'Precio unitario'
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
    service_unit_price: 0,
    client_name: '',
    client_phone: '',
    service_type: '',
    service_description: '',
    is_active: true,
    amount_service:0
  };

  serviceProduct: serviceProduct = {
    creation_date: '',
    delivery_date: '',
    service_unit_price: 0,
    client_name: '',
    client_phone: '',
    service_type: '',
    service_description: '',
    is_active: true,
        amount_service:0

  };

  userRegistry: userdataRegistry={
    email:'',
    password:'',
    rol:''
  }
  processCreate: processRegister={
    process_price:0,
    process_description:'',
    process_name:''
  }
  @ViewChild('dt') dt!: Table;
  newRegistry=0;

  materiaPcreateOriginal: any; // Debes mantener una copia de los datos originales

  formChanged: boolean = false;
  serviceRawMaterialList:any;
  proccesServiceList: GetservicesProcces[]=[];
  proccesList: GetservicesProcces[]=[];
  visibleProcessCreate:boolean=false;
  addedproccesCreate: boolean=false

  processSelected:any;
  getProcess:any;
  getUsers:any;
  UserSelected:any;
  UserSelected1:any;
  usersInfo:any;
  processInfo:any;
  servicesProcces:servicesProcces={
    process_id: 0,
 service_id: 0,
user_id:0
  }
  processesFound=[]
  selectedProcessPrice:number=0;

  users: userdata[] = [];
  processes: Process[] = [];
  uniqueEmails:any[]=[];
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
        this.product_materia= []
        this.columnas=[]
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

    } else if (this.selectedOptionServices === 'Confección') {
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
    } else if (this.selectedOptionServices === 'Confección') {
      // Llamar al servicio para obtener los datos de la opción 2
      this.product_materia= []
      this.columnas=[]
      await this.getRegistryConfe()
    } else if (this.selectedOptionServices === 'Usuarios') {
      // Llamar al servicio para obtener los datos de la opción 3
      this.product_materia= []
      this.columnas=[]

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

    if(this.selectedOptionServices === 'Confección' || this.selectedOptionServices === 'Reparacion'){
      this.serviceProduct.creation_date= new Date().toISOString().substring(0,10);

      this.createRegistryService(this.serviceProduct)
    }else{
      const data = {
        name: this.name_registry,
        material_type: this.materialselected,
        remaining_amount: this.remaining_amount,
        unit_price: this.precio,
        unit_of_measure:this.unit_selected,

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
        this.visibleCreateFarm = false;
        this.onSelectionChange()

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


 async showParcelEdit( showData: any) {
    this.editVisibleParcel = true;
    if (this.selectedOptionServices === 'Materia_prima') {

      this.materiaPcreate = {...showData}

    } else if (this.selectedOptionServices === 'Confección') {
      this.serviceProductSelect= {...showData}
      await this.getProccesService(showData);


      }
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
        this.product_materia= []
        this.columnas=[]
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


 async  createRegistryService(data: any) {
    this.services.createService(data).subscribe({
      next: (response) => {
        this.messagerService.add({
          severity: 'success',
          summary: 'Movimiento exitoso',
          detail: 'Se logró hacer el registro ',
        });
        this.visibleCreateService=false;
        this.onSelectionChange()
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
    if ('id' in this.materiaPcreate) {

      this.services.updateMaterials(this.materiaPcreate.id,this.materiaPcreate).subscribe({
        next: (response) => {
          this.messagerService.add({
            severity: 'success',
            summary: 'Movimiento exitoso',
            detail: 'Se logró hacer el registro ',
          });
          this.editVisibleParcel = true;

          this.onSelectionChange()

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

  }

  onSubmit2Service(){
    if ('id' in this.serviceProductSelect) {
    this.services.updateService(this.serviceProductSelect.id,this.serviceProductSelect).subscribe({
      next: (response) => {
        this.messagerService.add({
          severity: 'success',
          summary: 'Movimiento exitoso',
          detail: 'Se logró hacer el registro ',
        });
        this.editVisibleParcel = true;

        this.onSelectionChange()

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
}

  isFormDirty(): boolean {
    return JSON.stringify(this.materiaPcreate) !== JSON.stringify(this.materiaPcreateOriginal);
  }


  deleteProduct(product: any) {
    this.confirmationService.confirm({
        message: '¿Estas seguro de eliminar este elemento?' ,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteMateria(product.id,product)
        }
    });
}

  deleteMateria(id:any,product:any){

    if (this.selectedOptionServices === 'Materia_prima') {
      this.services.deleteMaterials(id,product).subscribe({
        next: (response) => {
          this.messagerService.add({
            severity: 'success',
            summary: 'Movimiento exitoso',
            detail: 'Se logró eliminar el dato',
          });

          this.onSelectionChange()

        },
        error: (err) => {
          this.messagerService.add({
            severity: 'error',
            summary: 'Hubo un error ',
            detail: 'Registro no éxitoso',
          });
        },
      });

    }else{
      this.services.deleteServices(id,product).subscribe({
        next: (response) => {
          this.messagerService.add({
            severity: 'success',
            summary: 'Movimiento exitoso',
            detail: 'Se logró hacer el registro ',
          });

          this.onSelectionChange()

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

  }




  async createServicesProcess(data: servicesProcces) {
    data=this.servicesProcces
    data.user_id=this.UserSelected.id
    data.process_id=this.processSelected.id
    this.services.createServicesProcess(data).subscribe({
      next: (response) => {
        this.messagerService.add({
          severity: 'success',
          summary: 'Movimiento exitoso',
          detail: 'Se logró hacer el registro del proceso de servicio',
        });
        this.addedproccesCreate = false;

        this.onSelectionChange();
      },
      error: (err) => {
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error',
          detail: 'Registro no exitoso del proceso de servicio',
        });
      },
    });
  }

  updateProcesses() {
    for (const email of this.uniqueEmails) {
      const processesByEmail = this.processInfo.filter((item: { email: any; }) => item.email === email);

      const processes = processesByEmail.map((item: { process_name: any; }) => item.process_name);

      this.processesFound = this.processesFound.concat(processes);
    }
  }

  updatePrice() {
    const selectedProcess = this.processInfo.find((item: { process_name: any; email: any; }) =>
      item.process_name === this.processSelected && item.email === this.UserSelected1
    );

    if (selectedProcess) {
      this.selectedProcessPrice = selectedProcess.process_price*this.serviceProductSelect.amount_service;
    } else {
      this.selectedProcessPrice = 0;
    }
  }
  async getProccesService(showData:any) {
    this.services.getProccesService().subscribe({
      next: (response) => {
        this.proccesServiceList = response;
        const ServicesSeles= this.proccesServiceList.filter((item: { service_id: any; }) => item.service_id === showData.id);
        this.uniqueEmails = [...new Set(ServicesSeles.map((item: { email: any; }) => item.email))];
        this.processInfo=ServicesSeles
      },
      error: (err) => {
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error',
          detail: 'No se pudo obtener la lista de procesos de servicio',
        });
      },
    });
  }

  async createProcces(data: processRegister) {
    this.services.createProcces(data).subscribe({
      next: (response) => {
        this.messagerService.add({
          severity: 'success',
          summary: 'Movimiento exitoso',
          detail: 'Se logró hacer el registro del proceso',
        });
        this.onSelectionChange();
      },
      error: (err) => {
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error',
          detail: 'Registro no exitoso del proceso',
        });
      },
    });
  }

  async getProcces() {
    this.services.getProcces().subscribe({
      next: (response) => {
        this.getProcess = response;
      },
      error: (err) => {
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error',
          detail: 'No se pudo obtener la lista de procesos',
        });
      },
    });
  }

  async serviceRawMaterial(data: serviceRawMaterial) {
    this.services.service_raw_Material(data).subscribe({
      next: (response) => {
        this.messagerService.add({
          severity: 'success',
          summary: 'Movimiento exitoso',
          detail: 'Se logró hacer el registro del material crudo del servicio',
        });
        this.onSelectionChange();
      },
      error: (err) => {
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error',
          detail: 'Registro no exitoso del material crudo del servicio',
        });
      },
    });
  }

  async getServiceRawMaterial() {
    this.services.getservice_raw_Material().subscribe({
      next: (response) => {
        this.serviceRawMaterialList = response;
      },
      error: (err) => {
        this.messagerService.add({
          severity: 'error',
          summary: 'Hubo un error',
          detail: 'No se pudo obtener la lista de materiales crudos del servicio',
        });
      },
    });
  }

  showprocessRegistry(){
this.visibleProcessCreate=true;
  }


  createProcessButton(){
      this.createProcces(this.processCreate);
  }

 async  addedprocess(data: any){
    this.servicesProcces.service_id=data.id
    await  this.getUsersService()
    await  this.getProcces()
    this.addedproccesCreate=true;

  }

 async  createUserServiceProcess(){

    this.createServicesProcess(this.servicesProcces);
}


async getUsersService() {
  this.services.getUsers().subscribe({
    next: (response) => {
      this.getUsers = response;
    },
    error: (err) => {
      this.messagerService.add({
        severity: 'error',
        summary: 'Hubo un error',
        detail: 'No se pudo obtener la lista de usuarios',
      });
    },
  });
}

}
