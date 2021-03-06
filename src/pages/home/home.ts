import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

//woocommcer api imported via npm install woocommerce-api --save
//WC is the local variable
//With the WC variable you can use the functions with the woocommerce aPI
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  WooCommerce: any;
  products: any[];
  page: number
  moreProducts: any[];

  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
   this.page = 2;
   //initalize woo commerce api
   this.WooCommerce = WC({
     url: "http://localhost:8888/woocommerce",
     consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
     consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
   });

    this.loadMoreProducts(null);

   this.WooCommerce.getAsync("products").then( (data)=> {
     this.products = JSON.parse(data.body).products;
     console.log(this.products);
   }, (err) => {
     console.log(err);
   });
  }

  ionViewDidLoad(){
    setInterval(() => {
      //code here will be executed every 3 seconds
      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1){
        this.productSlides.slideTo(0);
      }
      this.productSlides.slideNext()
    }, 5000)
  }

  loadMoreProducts(event) {

     if(event == null) {
       this.page = 2;
       this.moreProducts = [];
     } else {
       this.page ++;
     }

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data)=> {
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null) {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10) {
        //stops the event if there are less than 10 events
        event.enable(false);

        this.toastCtrl.create({
          message: "All products have been loaded",
          duration: 4000
        }).present()
      }

      console.log(this.products);
    }, (err) => {
      console.log(err);
    });
  }

  openProductPage(product){
  this.navCtrl.push(ProductDetailsPage, {"product": product});

  }

}
