import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';

import { ExerciseEditPage } from '../exercise-edit/exercise-edit';

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
    private loadingCtrl: LoadingController) {}


  // ------------------------------------------------------------------
  ngOnInit() {

    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.authService.geCurrentUser().getToken()
      .then(
        (token: string) => {

          loading.present();    
          this.exerciseService.loadAllExercises(token)
            .subscribe(
              (list: Exercise[]) => {
                loading.dismiss();
                if (list) {
                  console.log(list);
                  this.exercises = list;
                } else {
                  this.exercises = [];
                }
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().message);
              }
            )
        }
      )
      .catch(err => console.log(err));
  }


  // -------------------------------------------------------------
  onLoad(index: number) {
    // this.navCtrl.push(RecipePage, { recipe: this.recipes[index], index: index});
  }

  // ------------------------------------------------------------------
  onNewExercise() {
    console.log('onNewWorkout');
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

