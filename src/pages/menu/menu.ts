import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage} from '../products-by-category/products-by-category';

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
  //set up child view to allow the menu to be used on the more products page
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.homePage = HomePage;
   this.categories = [];

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, {"category": category})
  }

}
