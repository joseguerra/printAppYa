import { Component } from '@angular/core';

import { ResumenPage } from '../resumen/resumen';
import { ContactPage } from '../contact/contact';
import { VentaPage } from '../venta/venta';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = VentaPage;
  tab2Root = ResumenPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
