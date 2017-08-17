import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentaPage } from './venta';

@NgModule({
  declarations: [
    VentaPage,
  ],
  imports: [
    IonicPageModule.forChild(VentaPage),
  ],
  exports: [
    VentaPage
  ]
})
export class VentaPageModule {}
