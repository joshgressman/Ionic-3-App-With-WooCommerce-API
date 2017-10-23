import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // New user object to be used for [(ngModel)] in form
  newUser: any = {};
  billing_shipping_same: boolean;
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    //Initilaizes the billing address object within newUser object
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false;

    this.WooCommerce = WC({
      url: "http://localhost:8888/woocommerce",
      consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
      consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
    });

  }

setBillingToShipping(){
  this.billing_shipping_same = !this.billing_shipping_same;
}


checkEmail(){
 let validEmail = false;
 let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 //Validates email with regular expression
 if(reg.test(this.newUser.email)){
   this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then((data) => {
    let res = (JSON.parse(data.body));

    if(res.errors){
      validEmail = true;

       this.toastCtrl.create({
         message: "Email is good to go",
         duration: 3000
       }).present();

    } else {
      validEmail = false;
      this.toastCtrl.create({
        message: "Email is registered to another account",
        showCloseButton: true
      }).present();
    }

    console.log(validEmail);

   })
 } else {
   validEmail = false;
     console.log(validEmail);
     this.toastCtrl.create({
       message: "Invalid email, please check",
       showCloseButton: true
     }).present();
 }

}

signup(){
  let customerData = {
    customer: {}
  }

  customerData.customer = {
        "email": this.newUser.email,
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "username": this.newUser.username,
        "password": this.newUser.password,
        "billing_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.billing_address.address_1,
          "address_2": this.newUser.billing_address.address_2,
          "city": this.newUser.billing_address.city,
          "state": this.newUser.billing_address.state,
          "postcode": this.newUser.billing_address.postcode,
          "country": this.newUser.billing_address.country,
          "email": this.newUser.email,
          "phone": this.newUser.billing_address.phone
        },
        "shipping_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.shipping_address.address_1,
          "address_2": this.newUser.shipping_address.address_2,
          "city": this.newUser.shipping_address.city,
          "state": this.newUser.shipping_address.state,
          "postcode": this.newUser.shipping_address.postcode,
          "country": this.newUser.shipping_address.country
        }
      }

     if(this.billing_shipping_same){
       this.newUser.shipping_address = this.newUser.shipping_address;
     }

     this.WooCommerce.postAsync('customers', customerData).then((data) => {
       console.log(JSON.parse(data.body));
     })
}

}
