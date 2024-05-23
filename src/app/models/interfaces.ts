export interface userLogin {
  password: string;
  email: string;

}


export interface user {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
}

export interface userdata {
  id: number;
  email: string;
  password: string;

}
export interface userdataRegistry {
  email: string;
  password: string;
 rol: string
}

export interface userdataUpdate {
  email: string;
}

export interface userdataUpdatePassword {

    current_password: string;
    new_password: string;
    confirm_new_password: string;

}


export interface pedidos{
  nameProv: string;
  dateStart: string;
  dateEnd: string;
  cantidad: number;
  precio: number
}

export interface materiaP {
  id: number;
  name: string;
  material_type: string;
  remaining_amount: string; // Cambiado para coincidir con 'remaining_amount*'
  unit_price: string; // Cambiado para coincidir con 'unit_price*'
  unit_of_measure: string; // Cambiado para coincidir con 'unit_of_measure*'
  user_register: number;
}




export interface materiaPcreate {
  name: string;
  material_type: string;
  remaining_amount: string; // Cambiado para coincidir con 'remaining_amount*'
  unit_price: string; // Cambiado para coincidir con 'unit_price*'
  unit_of_measure: string; // Cambiado para coincidir con 'unit_of_measure*'
  user_register: number;
}



export interface serviceProduct{
  creation_date: string;
  delivery_date: string;
  service_price: number;
  client_name: string;
  client_phone: string;
  service_type: string;
  service_description: string;
  is_active: true;
  user_register: 0
}

export interface servicesProcces{
 service_id: number;
user_id:number
}
export interface servicesProccesGet{
  process_id:number;
 service_id: number;
user_id:number
}



export interface  processRegister{
  proccess_price: number;
  process_name: string;
  process_description:string;
  process_user: number;
}

export interface serviceRawMaterial{
  raw_material_amount: string;
  raw_material_id:number;
  service_id:number;
}
