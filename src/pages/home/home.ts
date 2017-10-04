import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//woocommcer api imported via npm install woocommerce-api --save
//WC is the local variable
//With the WC variable you can use the functions with the woocommerce aPI
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;

  constructor(public navCtrl: NavController) {
   this.WooCommerce = WC({
     url: "http://localhost:8888/woocommerce",
     consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
     consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
   });
   this.WooCommerce.getAsync("products").then( (data)=> {
     console.log("data", data);
   }, (err) => {
     console.log(err);
   });
  }

}
