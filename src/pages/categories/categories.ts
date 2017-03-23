import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
  }  

}
