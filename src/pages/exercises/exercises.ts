import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, PopoverController } from 'ionic-angular';

import { ExercisePage } from '../exercise/exercise';
import { ExerciseEditPage } from '../exercise-edit/exercise-edit';
import { ExercisesOptionsPage } from '../exercises-options/exercises-options';

import { Category } from '../../models/category';
import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../services/exercise';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})
export class ExercisesPage implements OnInit {

  exercises: Exercise[] = [];
  
  // ------------------------------------------------------------------
  constructor(
    private navCtrl: NavController, 
    private exerciseService: ExerciseService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController) {}


  // ------------------------------------------------------------------
  ngOnInit() {

    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();    
    
    this.exerciseService.findAllExercises()
      .subscribe(
        (list: Exercise[]) => {
          loading.dismiss();

          if (list) {
            this.exercises = list;
            
            this.exercises.map(exercise => {

              this.exerciseService.findAllCategoriesForExercise(exercise.url)
                .subscribe(
                  (categories: Category[]) => {

                  exercise.categories = categories;
    
                  }
                )
            });
            
            // console.log('this.exercises', this.exercises);
            
          } else {
            this.exercises = [];
          }
        },
        error => {
          loading.dismiss();
          this.handleError(error.json().message);
        },
        () => {
          console.log('hello there');
        }
      )
  }


  // -------------------------------------------------------------
  onLoad(index: number) {
    this.navCtrl.push(ExercisePage, { exercise: this.exercises[index], index: index});
  }

  // -------------------------------------------------------------
  onShowOptions(index: number, event: MouseEvent) {

    const popover = this.popoverCtrl.create(ExercisesOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(
      data => {
        if (data != null && data.action == 'edit') {
          this.navCtrl.push(ExerciseEditPage, { exercise: this.exercises[index], mode: 'Edit'})
        }
      });

  }

  // ------------------------------------------------------------------
  onNewExercise() {
    this.navCtrl.push(ExerciseEditPage);
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

