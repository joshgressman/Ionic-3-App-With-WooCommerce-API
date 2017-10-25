import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage} from '../products-by-category/products-by-category';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { CartPage } from '../cart/cart';

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
  categories: any[];
  loggedIn: boolean;
  user: any;


  //set up child view to allow the menu to be used on the more products page
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
   this.homePage = HomePage;
   this.categories = [];
   this.user = {};


   this.WooCommerce = WC({
     url: "http://localhost:8888/woocommerce",
     consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
     consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
   });

   this.WooCommerce.getAsync("products/categories").then((data) => {
    console.log("cat",JSON.parse(data.body).product_categories);
    let temp: any[] = JSON.parse(data.body).product_categories;

    //Loops through the categories array and pushes only parent cateories
    for(let i = 0; i < temp.length; i++){
      if(temp[i].parent == 0){
        //creates an icon property
        if(temp[i].slug == 'clothing'){
          temp[i].icon = "shirt";
        }

        if(temp[i].slug == 'music'){
          temp[i].icon = "musical-notes";
        }

        if(temp[i].slug == 'posters'){
          temp[i].icon = "images";
        }
        this.categories.push(temp[i]);
      }
    }


   }, (err) => {
     console.log(err);
   });
  }

  //Executed whenever user navigates to the page
  ionViewDidEnter() {
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {

        if(userLoginInfo != null) {
          console.log("user is logged in");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        } else {
          console.log("No user found");
          this.loggedIn = false;
        }
      })
    })
  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, {"category": category})
  }

  openPage(pageName: string){
   if(pageName == 'signup'){
     this.navCtrl.push(SignupPage);
   }

   if(pageName == 'login'){
     this.navCtrl.push(LoginPage);
   }

   if(pageName == 'logout'){
     this.storage.remove("userLoginInfo").then( () => {
       this.user = {};
       this.loggedIn = false;

     })
   }

   if(pageName == 'cart') {
     let modal = this.modalCtrl.create(CartPage);
     modal.present();
   }

  }

}
