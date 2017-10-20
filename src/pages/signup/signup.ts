import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  // New user object to be used for [(ngModel)] in form
  newUser: any = {};
  billing_shipping_same: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //Initilaizes the billing address object within newUser object
    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.billing_shipping_same = false;
  }

setBillingToShipping(){
  this.billing_shipping_same = !this.billing_shipping_same;
}

}
