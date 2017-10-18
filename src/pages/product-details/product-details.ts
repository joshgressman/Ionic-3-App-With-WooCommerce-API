import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;
  WooCommerce: any;
  reviews: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController, public modalCtrl: ModalController) {
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

// Add product to cart in local storage
  addToCart(product){
    this.storage.get("cart").then((data) => {

     if(data == null || data.length == 0){
       data = [];
       data.push({
         "product": product,
         "qty": 1,
         "amount": parseFloat(product.price)
       });
     } else {
       let added = 0;
       for(let i = 0; i < data.length; i++){
         if(product.id == data[i].product.id){
           console.log("Product is already in the cart");
           let qty = data[i].qty;
           data[i].qty = qty+1;
           data[i].amount = parseFloat(data[i].amount + parseFloat(data[i].product.price));
           added = 1;

         }
       }
       if(added == 0) {
         data.push({
           "product": product,
           "qty": 1,
           "amount": parseFloat(product.price)
         });
       }
     }

    //  Add product to local storage

    this.storage.set("cart", data).then(() => {
      console.log("cart updated");
      console.log("cart items", data);
      this.toastCtrl.create({
        message: "Item added to cart",
        duration: 3000
      }).present();
    })

    });
  }

  openCart() {
    let modal = this.modalCtrl.create(CartPage);
    modal.present();
  }


}
