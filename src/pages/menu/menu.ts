import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
//woocommcer api imported via npm install woocommerce-api --save
//WC is the local variable
//With the WC variable you can use the functions with the woocommerce aPI
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: Component;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.homePage = HomePage;

   this.WooCommerce = WC({
     url: "http://localhost:8888/woocommerce",
     consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
     consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
   });

   this.WooCommerce.getAsync("products/categories").then((data) => {
    console.log("cat",JSON.parse(data.body).product_categories);
   }, (err) => {
     console.log(err);
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
