import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, LoadingController, NavController, PopoverController } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';

import { WorkoutPage } from '../workout/workout';
import { WorkoutEditPage } from '../workout-edit/workout-edit';
import { WorkoutsOptionsPage } from '../workouts-options/workouts-options';

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
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController) {}


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
    this.navCtrl.push(WorkoutPage, { workout: this.workouts[index], index: index});
  }

  // -------------------------------------------------------------
  onShowOptions(index: number, event: MouseEvent) {

    const popover = this.popoverCtrl.create(WorkoutsOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(
      data => {
        if (data != null && data.action == 'edit') {
          this.navCtrl.push(WorkoutEditPage, { workout: this.workouts[index], mode: 'Edit'})
        }
      });

  }

  // ------------------------------------------------------------------
  onNewWorkout() {
    this.navCtrl.push(WorkoutEditPage, { workout: null, mode: 'New'});    
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
