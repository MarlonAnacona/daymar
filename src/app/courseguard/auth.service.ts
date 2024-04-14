//Clase en la cual se guarda el guardian en caso de estar logueado o no a la aplicación
export class Authservice {
  loogedIn = localStorage.getItem('token') || null;

  //En caso de estar logeado
  login() {
    if (this.loogedIn) {
      console.log("login")
      this.loogedIn;
    } else {
      console.log("null")

      this.loogedIn = null;
    }
  }

  //En caso de salirse de la cuenta
  logout() {
    this.loogedIn = null;
  }

  //Autentica el logeo
  IsAuthenticated() {
    return this.loogedIn;
  }
  //Autentica el logeo
  IsAuthenticatedLoggin() {
    return this.IsAuthenticated();
  }
}
