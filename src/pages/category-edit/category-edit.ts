import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { generateUrl } from '../../shared/generate-url';

import { Category } from '../../models/category';
import { CategoryPage } from '../category/category';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'page-category-edit',
  templateUrl: 'category-edit.html'
})
export class CategoryEditPage implements OnInit {

  mode = 'New';
  category: Category;
  categoryForm: FormGroup;
  
  // ----------------------------------------------------------------------
  constructor(
      private navCtrl: NavController,
      private navParams: NavParams, 
      private viewCtrl: ViewController,
      private categoryService: CategoryService) {

  }

  // ----------------------------------------------------------------------
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.category = this.navParams.get('category');
    this.initForm(this.mode, this.category);
  }
  

  // ----------------------------------------------------------------------
  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
  }

  // ----------------------------------------------------------------------
  onSubmit() {

    const newCategory = this.categoryForm.value;
    newCategory.url = generateUrl(newCategory.name);

    if (this.mode == 'Edit') {
      
      this.categoryService.updateCategory(this.category.$key, newCategory)
        .then(
          () => {
            this.navCtrl.push(CategoryPage, {workout: newCategory});
          }
        )
        .catch(err => console.log('update failed: ', err));

    } else {

      this.categoryService.createCategory(newCategory)
        .then(() => this.navCtrl.pop())
        .catch(err => console.log(err));

    }

  }

  // ----------------------------------------------------------------------
  onRemove() {
    this.categoryService.removeCategory(this.category)
      .then(() => this.navCtrl.popToRoot())
      .catch(err => console.log(err));
  }

  // ----------------------------------------------------------------------
  private initForm(mode: string, cateory: Category) {

    if (mode == 'New') {
      this.categoryForm = new FormGroup({
        'name': new FormControl(null, Validators.required)
      });
    } else {
      this.categoryForm = new FormGroup({
        'name': new FormControl(cateory.name, Validators.required)
      });
    }
  }

}

