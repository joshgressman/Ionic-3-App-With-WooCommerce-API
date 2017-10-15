import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("product");
    console.log("product", this.product);
  }


}
