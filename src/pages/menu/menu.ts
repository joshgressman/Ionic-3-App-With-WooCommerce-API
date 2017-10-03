import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: Component;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.homePage = HomePage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
