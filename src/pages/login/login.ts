import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
//import Http to be used with the WP JSON API plugin
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController) {
    //Initialize the variable values
    this.username = '';
    this.password = '';

  }

 login(){

  this.http.get("http://localhost:8888/woocommerce/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
  .subscribe( (res) => {
    console.log(res.json());
    let response = res.json();

    if(response.error){
      this.toastCtrl.create({
        message: response.error,
        duration: 5000
      }).present();
      return;
    }

    this.storage.set("userLoginInfo", response).then( (data) => {
      this.alertCtrl.create({
        title: "Login Successfull!",
        message: "You are now logged in",
        buttons: [{text: "OK", handler: () => {
          if(this.navParams.get("next")){
          this.navCtrl.push(this.navParams.get("next"));
        } else {
          this.navCtrl.pop();
        }
      }}]
    }).present();
    })
  });
 }

}
