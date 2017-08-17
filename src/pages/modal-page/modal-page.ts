import { Component,ViewChild,OnInit } from '@angular/core';
import { IonicPage, NavParams,ViewController } from 'ionic-angular';
import {Venta} from '../venta/venta.provider';
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-page',
  templateUrl: 'modal-page.html',
})
export class ModalPage {
  @ViewChild('myinput') input
  cantidad: string = '';
  juego: string = '';
  lotery: string;
  prueba:boolean = false;
  private focused: boolean;
  numero:number = 0; 
  indice:string; 
  lote: any;
  constructor(private navParams: NavParams,
              private venta: Venta,
              private view: ViewController) {
  }

  ngOnInit(){
      this.getLoteries();
      this.focused = true      
  }

  ionViewDidLoad() {

    if (this.focused) {
      setTimeout(()=>{
        console.log("entre")
        this.input.setFocus()
        this.focused = false
      }, 300)
    }
    
    this.indice = this.navParams.get('indice');
    this.cantidad = this.navParams.get('data').cantidad;
    this.juego = this.navParams.get('data').juego;
    this.lotery = this.navParams.get('data').lotery;
  }

  guardar(){
    this.venta.getLotery(this.lotery).subscribe(dato=>{      
      const data = {
        cantidad: this.cantidad,
        juego: this.juego,
        lotery: this.lotery,
        loteryName: dato.name
      }
    this.view.dismiss(data,this.indice);
    },err=>{
    })  

  }

  change(){
    this.focused = true   
    if (this.focused) {
      setTimeout(()=>{
        this.numero ++;        
        this.input.setFocus()
        this.focused = false
      }, 300)
    }

     this.prueba = !this.prueba;
  }

  add(int){    
    if(this.numero % 2 == 0 ){
      if(int=='c')       
        this.juego =  this.juego.slice(0,-1);                                
      else{
        if(this.juego.length == 2 || this.juego.length ==5)
          this.juego += '-';
        if(this.juego.length<8)
          this.juego += int;
      }
        
    }
    else{
      if(int=='c')
        this.cantidad =  this.cantidad.slice(0,-1);
      else{
        if(this.cantidad.length<8)
        this.cantidad += int;
      }
        
    }    
  }

  getLoteries(){
    this.venta.getLoteries().subscribe(data=>{      
      this.lote = data;  
      console.log(data)    
    },err=>{
    })
  }

}
