export interface userLogin {
  password: string;
  identificacion: string;

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

export interface materiaP{
  id:number;
  name: string;
  material: string;
  price: number;

}
