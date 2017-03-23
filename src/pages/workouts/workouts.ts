import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';

import { WorkoutEditPage } from '../workout-edit/workout-edit';

import { Workout } from '../../models/workout';
import { WorkoutService } from '../../services/workout';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.html'
})
export class WorkoutsPage implements OnInit {

  workouts: Workout[] = [];
  test = ['Hello', 'there'];

  // ------------------------------------------------------------------
  constructor(
    private navCtrl: NavController, 
    private workoutService: WorkoutService,
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
          this.workoutService.getAllWorkoutsFromDb(token)
            .subscribe(
              (list: Workout[]) => {
                loading.dismiss();
                if (list) {
                  // this.workouts = list;
                  // console.log(this.workouts);
                  this.workouts = Object.keys(list).map(function(key) { return list[key]; });
                  console.log(this.workouts);

                } else {
                  this.workouts = [];
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
  onNewWorkout() {
    console.log('onNewWorkout');
    this.navCtrl.push(WorkoutEditPage);
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
