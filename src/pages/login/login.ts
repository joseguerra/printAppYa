import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  email: string;
  pass: string;	
  tabs = TabsPage;
  userProfile: any = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,                
              public loadingCtrl: LoadingController,              
              public storage: Storage,
              ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  showAlert(message,title) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  login(){
    this.storage.set('email', this.email);
    this.navCtrl.setRoot(TabsPage);


  }



}
