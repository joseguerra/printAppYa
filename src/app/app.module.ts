import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
////////////////////////////////////////////////////////////////////////////////////////
// Components
////////////////////////////////////////////////////////////////////////////////////////

import { PagarPage } from '../pages/pagar/pagar';
import { ContactPage } from '../pages/contact/contact';
import { VentaPage } from '../pages/venta/venta';
import { ResumenPage } from '../pages/resumen/resumen';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';

////////////////////////////////////////////////////////////////////////////////////////
// Providers
////////////////////////////////////////////////////////////////////////////////////////

import {Pagar} from '../pages/pagar/pagar.provider';
import {Contact} from '../pages/contact/contact.provider';
import {Venta} from '../pages/venta/venta.provider';
import {Resumen} from '../pages/resumen/resumen.provider';

import {Rutas} from './rute';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LimitToDirective} from '../components/autofocus/autofocus';

@NgModule({
  declarations: [
    MyApp,
    PagarPage,
    ContactPage,
    VentaPage,
    ResumenPage,
    TabsPage,
    Login,
    LimitToDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PagarPage,
    ContactPage,
    VentaPage,
    ResumenPage,
    TabsPage,
    Login
  ],
  providers: [
    Rutas,
    Pagar,
    Contact,
    Venta,
    Resumen,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
