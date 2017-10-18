import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cartItems: any[] = [];
  total: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    //access storage when storage is ready to be accessed
    this.storage.ready().then(() => {
      //access cart data from storage
      this.storage.get("cart").then((data) => {
        this.cartItems = data;
        console.log("items in cart", data);
        
      })
    });
  }


}
