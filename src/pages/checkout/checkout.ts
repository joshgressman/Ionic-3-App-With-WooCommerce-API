import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  WooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, private paypal: PayPal) {
   this.newOrder = {};
   this.newOrder.billing_address = {};
   this.newOrder.shipping_address = {};
   this.billing_shipping_same = false;

   this.paymentMethods = [
     {method_id: "bacs", method_title: "Direct Bank Transfer"},
     {method_id: "cheque", method_title: "Cheque Payment"},
     {method_id: "cod", method_title: "Cash on Delivery"},
     {method_id: "paypal", method_title: "PayPal"}
   ];

   this.WooCommerce = WC({
     url: "http://localhost:8888/woocommerce",
     consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
     consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
   });

   //Access logged in user info in local storage
   this.storage.get("userLoginInfo").then( (userLoginInfo) => {

     this.userInfo = userLoginInfo.user;

     let email = userLoginInfo.user.email;

     this.WooCommerce.getAsync("customers/email/" + email).then( (data) => {
       //assign data to new user object
       this.newOrder = JSON.parse(data.body).customer;
       console.log("new order info", this.newOrder);
     })

   })
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;

    if(this.billing_shipping_same){
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }
  }

  placeOrder(){
    let orderItems: any[] = [];
    let data: any = [];
    let paymentData: any = {}

    this.paymentMethods.forEach((element, index) => {
      if(element.method_id == this.paymentMethod){
        paymentData = element;
      }
    });

    data = {
      payment_details: {
        method_id: paymentData.method_id,
        method_title: paymentData.method_title,
        paid: true
      },

      billing_address: this.newOrder.billing_address,
      shipping_address: this.newOrder.shipping_address,
      customer_id: this.userInfo.id || '',
      line_items: orderItems
    };

     if(paymentData.method_id == 'paypal'){

     } else {
       this.storage.get("cart").then( (cart) => {
         console.log("cart items", cart);

         cart.forEach( (element, index) => {
           orderItems.push({
             product_id: element.product.id,
             quantity: element.qty
           });
         });

         data.line_items = orderItems;

         let orderData: any = {};

         orderData.order = data;

         this.WooCommerce.postAsync("orders", orderData).then( (data) => {
           let response = (JSON.parse(data.body).order);

           this.alertCtrl.create({
             title: "Order placed successfully!",
             message: "Your order number is" + response.order_number,
             buttons: [{
               text: "OK",
               handler: () => {
                 this.navCtrl.setRoot(HomePage);
               }
             }]
           }).present();
         })

       })
     }

  }

}
