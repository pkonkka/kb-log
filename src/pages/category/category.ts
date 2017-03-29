import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Category } from '../../models/category';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  category: Category;

  // -------------------------------------------------------------------------------------
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private categoryService: CategoryService) {}

  // -------------------------------------------------------------------------------------
  ionViewWillEnter() {

    this.viewCtrl.setBackButtonText('');
    this.category = this.navParams.get('category');

    console.log(this.category);

  }

  // -------------------------------------------------------------------------------------
  onEditCategory() {
    // this.navCtrl.push(WorkoutEditPage, { workout: this.workout, mode: 'Edit'});    
  }

  // -------------------------------------------------------------------------------------
  onLoad(index: number) {
    // this.navCtrl.push(ExercisePage, { workout: this.workout, exercise: this.workoutExercises[index]});
  }


}
