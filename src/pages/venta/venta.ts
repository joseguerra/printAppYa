import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController,AlertController,ModalController,Modal  } from 'ionic-angular';
import {PagarPage} from '../pagar/pagar';
import {Venta} from './venta.provider'; 

@Component({
  selector: 'page-venta',
  templateUrl: 'venta.html'
})
export class VentaPage implements OnInit {
  @ViewChild('myinput') input
  cantidad: string = '';  
  juego: string = '';
  lotery: string;
  loteryName : string;
  prueba:boolean = false;
  private focused: boolean;
  numero:number = 0; 
  total:number = 0;
  lote: any;
  loterias: Array<Object> = [];
  plays: Array<Object> = [];
  jugada: any;
  constructor(public navCtrl: NavController,
              public venta: Venta,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
  }

  ngOnInit(){
    this.getLoteries();
    this.focused = true      

  }

  ionViewDidLoad() {
    
    if (this.focused) {
      setTimeout(()=>{
        this.input.setFocus()
        this.focused = false
      }, 300)
    }
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

  pay(){
    
    for(var i =0; i< this.loterias.length ; i++ ){
      var type;      
      var numbers: any [];
      
      let juego: any = this.loterias[i];
      numbers = juego.juego.split("-");
      var cost = 0;
      cost = Number(juego.cantidad);
      for(var j =0; j< numbers.length ; j++ ){
        numbers[j] = Number(numbers[j]);        
      }
      if(juego.juego.length<=3)
        type = "quiniela";

      if(juego.juego.length>3&&juego.juego.length<=6)
        type = "pale";

      if(juego.juego.length>6)
        type = "tripleta";      
        
      this.plays.push({'id':i+1,'type':type,'numbers':numbers,'cost':cost,"lottery_id":juego.lotery});    
    }
    
    this.jugada = {
      	"id": "59444b0ce6882509ecf96bb1",
	      "user_id": "59444b0ce6882509ecf96bb2",
        "plays":this.plays,
        "total_cost": this.total,
    }

    this.navCtrl.push(PagarPage,{
      jugada: this.jugada})
  }

  play(){
    if(this.prueba){
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
    this.total += Number(this.cantidad); 
    this.loterias.push({'juego':this.juego,'cantidad':this.cantidad,'lotery':this.lotery,'loteryName':this.loteryName});    
    this.juego = '';
    this.cantidad = '';
    this.lotery = '';
    this.loteryName = '';
  }

  delete(indice){
    var prueba: any;
    prueba  = this.loterias[indice];
    prueba.cantidad;     
    this.total -= Number(prueba.cantidad);
    this.loterias.splice(indice,1);
  }

  plus(indice){
    let alert = this.alertCtrl.create();
    alert.setTitle('Loterias');

    for(var i =0; i< this.lote.length ; i++ ){
      console.log(i)
      alert.addInput({
        type: 'radio',
        label: this.lote[i].name,
        value: this.lote[i].id,
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {

        this.venta.getLotery(data).subscribe(data=>{      
            this.loteryName = data.name; 

            var prueba: any;
            prueba  = this.loterias[indice];
            prueba.cantidad;          
            this.total += Number(prueba.cantidad);
            this.loterias.push({'juego':prueba.juego,'cantidad':prueba.cantidad,'lotery':data,'loteryName':this.loteryName}); 

        },err=>{
        })  

       
      }
    });
    alert.present();
  }


  edit(indice){
    const myModal: Modal = this.modalCtrl.create('ModalPage',{
      data: this.loterias[indice],
      indice: indice
    });
    myModal.present();

    myModal.onDidDismiss((data,indice)=>{
     
          
      this.loterias[indice] = data
      this.total = 0;
      for(var i=0; i<this.loterias.length;i++){
        var prueba: any = this.loterias[i];
        this.total += Number(prueba.cantidad);        
      }

      console.log(this.loterias);  
    }) 
  }

  loterys(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Loterias');
    for(var i =0; i< this.lote.length ; i++ ){
      console.log(i)
      alert.addInput({
        type: 'radio',
        label: this.lote[i].name,
        value: this.lote[i].id,
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.venta.getLotery(data).subscribe(data=>{      
          this.loteryName = data.name; 
        },err=>{
        })        
        this.lotery = data;     
      }
    });
    alert.present();
  }

  getLoteries(){
    this.venta.getLoteries().subscribe(data=>{      
      this.lote = data;      
    },err=>{
    })
  }

}
