import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("product");
    console.log("product", this.product);

    this.WooCommerce = WC({
      url: "http://localhost:8888/woocommerce",
      consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
      consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
    });

    //Get product review from woo api based on  product ID
    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then(
      (data) => {
        this.reviews = JSON.parse(data.body).product_reviews;
        console.log(this.reviews);
      }, (err) =>{
        console.log(err);
      }
    );
  }


}
