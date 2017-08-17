import { Injectable } from '@angular/core';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';
import {Rutas} from '../../app/rute';

/*
  Generated class for the Register provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Pagar {
  url : string = this.rutas.ticket(); 
  constructor(
    public http: Http,
    public rutas: Rutas
  ) {
  }

  addTicket(ticket:any){        
    var response = this.http.post(this.url,ticket).map(res => res.json());    
    return response;
  }


}
