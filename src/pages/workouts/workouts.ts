import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';

import { WorkoutEditPage } from '../workout-edit/workout-edit';

import { Workout } from '../../models/workout';
import { WorkoutService } from '../../services/workout';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.html'
})
export class WorkoutsPage implements OnInit, OnDestroy {

  workouts: Workout[] = [];
  workoutSub: Subscription;

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

    loading.present();    
    this.workoutSub = this.workoutService.findAllWorkouts()
      .subscribe(
        (list: Workout[]) => {
          loading.dismiss();
          if (list) {
            this.workouts = list;
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
  
  // -------------------------------------------------------------
  ngOnDestroy() {
    this.workoutSub.unsubscribe();
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
