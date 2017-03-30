import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Category } from '../../models/category';
import { Exercise } from '../../models/exercise';

import { CategoryEditPage } from '../category-edit/category-edit';
import { ExercisePage } from '../exercise/exercise';

import { CategoryService } from '../../services/category';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  category: Category;
  exercises: Exercise[];

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

    this.categoryService.findAllExercisesForCategory(this.category.url)
      .subscribe(
        exercises => this.exercises = exercises
      )
  }

  // -------------------------------------------------------------------------------------
  onEditCategory() {
    this.navCtrl.push(CategoryEditPage, { category: this.category, mode: 'Edit'});    
  }

  // -------------------------------------------------------------------------------------
  onLoad(index: number) {
    this.navCtrl.push(ExercisePage, { category: this.category, exercise: this.exercises[index]});
  }


}
