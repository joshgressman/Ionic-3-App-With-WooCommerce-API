import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {
   this.page = 2;
   this.WooCommerce = WC({
     url: "http://localhost:8888/woocommerce",
     consumerKey: "ck_68671b908096258d3744b8ff2511be0816df7c98",
     consumerSecret: "cs_f394c2fa6678df9f1a3a3feebae63e24ef06662a"
   });

    this.loadMoreProducts()

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
    }, 3000)
  }

  loadMoreProducts() {
    this.WooCommerce.getAsync("products?page=" + this.page).then( (data)=> {
      this.moreProducts = JSON.parse(data.body).products;
      console.log(this.products);
    }, (err) => {
      console.log(err);
    });
  }

}
