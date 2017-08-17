export class Rutas{
  urlbase: string = "http://localhost:8080/api/";
  urlimage: string = "http://dimmexico.co/pics_sponsors/";
  constructor(){}

  imageGet(){
    return this.urlimage;
  }

  lotery(){
    return this.urlbase+ "lotteries/";
  }


  ticket(){
    return this.urlbase+ "tickets/";
  }

  user(){
    return this.urlbase+ "users/";
  }






}
