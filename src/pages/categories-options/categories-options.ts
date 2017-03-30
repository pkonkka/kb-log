import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-categories-options',
  templateUrl: 'categories-options.html'
})
export class CategoriesOptionsPage {

  // ------------------------------------------------------------
  constructor(private viewCtrl: ViewController) {}


  // ------------------------------------------------------------
  onAction(action: string) {

    this.viewCtrl.dismiss({action: action});
    console.log('onAction: ', action);

  }

}
