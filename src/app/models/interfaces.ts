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
