import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import {VentaPage} from '../venta/venta';
import {Pagar} from './pagar.provider';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-pagar',
  templateUrl: 'pagar.html'
})
export class PagarPage implements OnInit {
    @ViewChild('myinput') input
  total: string;
  pay: string = '';
  vuelto: number = 0;
  ticket: any;
  private focused: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pagarProvider: Pagar,
              private barcodeScanner: BarcodeScanner,
              public alertCtrl: AlertController) {
    
    this.total = this.navParams.get('jugada').total_cost;
    console.log(this.navParams.get('jugada'));
}

  ngOnInit(){
      this.focused = true      
  }

  ionViewDidLoad() {
    this.ticket = this.navParams.get('jugada');
    if (this.focused) {
      setTimeout(()=>{
        console.log("entre")
        this.input.setFocus()
        this.focused = false
      }, 300)
    }
  }

  	showAlert(message,title) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  add(int){    

      if(int=='c'){
        this.pay =  this.pay.slice(0,-1);                                
        this.vuelto = Number(this.pay)-Number(this.total);
      }       
        
      else{
          this.pay += int;
          this.vuelto = Number(this.pay)-Number(this.total);

      }              
  }

  pagar(){
    this.pagarProvider.addTicket(this.ticket).subscribe((data)=>{
      this.showAlert("Su ticket se ha generado con exito","Perfecto");
      this.navCtrl.setRoot(VentaPage);
    },err=>{
      console.log(err);
    })    
  }

  async encode(){
    const result = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,'http://learnionic2.com');
  }

  cancelar(){
    this.navCtrl.pop();
  }

}
