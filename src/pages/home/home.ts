import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//woocommcer api imported via npm install woocommerce-api --save
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
