import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, NavController, PopoverController, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';

import { Category } from '../../models/category';
import { CategoryPage } from '../category/category';
import { CategoriesOptionsPage } from '../categories-options/categories-options';
import { CategoryEditPage } from '../category-edit/category-edit';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage implements OnInit, OnDestroy {

  categories: Category[];
  categorySub: Subscription;

  // ------------------------------------------------------------------
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController, 
    private popoverCtrl: PopoverController,
    private viewCtrl: ViewController,
    private categoryService: CategoryService) {}

  // ------------------------------------------------------------------
  ngOnInit() {

    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();    
    this.categorySub = this.categoryService.findAllCategories()
      .subscribe(
        (list: Category[]) => {
          loading.dismiss();
          if (list) {
            this.categories = list;
          } else {
            this.categories = [];
          }
        },
        error => {
          loading.dismiss();
          this.handleError(error.json().message);
        }
      )

  }

  // ------------------------------------------------------------------
  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
  }  

  // ------------------------------------------------------------------  
  ngOnDestroy() {
    this.categorySub.unsubscribe();
  }


  // -------------------------------------------------------------
  onLoad(index: number) {
    this.navCtrl.push(CategoryPage, { category: this.categories[index], index: index});
  }

  // -------------------------------------------------------------
  onShowOptions(index: number, event: MouseEvent) {

    const popover = this.popoverCtrl.create(CategoriesOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(
      data => {
        if (data != null && data.action == 'edit') {
          this.navCtrl.push(CategoryEditPage, { exercise: this.categories[index], mode: 'Edit'})
        }
      });

  }

  // ------------------------------------------------------------------
  onNewCategory() {
    // this.navCtrl.push(CategoryEditPage, { category: null, mode: 'New'});    
  }

  // ----------------------------------------------------------------------------
  private handleError(errorMessage: string) {

    const alert = this.alertCtrl.create({
      title: 'Error occured',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
  
}
