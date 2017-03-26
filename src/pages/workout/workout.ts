import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Subscription } from 'rxjs/Rx';

import { Exercise } from '../../models/exercise';
import { ExercisePage } from '../exercise/exercise';
import { Workout } from '../../models/workout';
import { WorkoutService } from '../../services/workout';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html'
})
export class WorkoutPage implements OnInit, OnDestroy {

  workout: Workout;
  workoutExercises: Exercise[];
  workoutSub: Subscription;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private viewCtrl: ViewController, 
    private workoutService: WorkoutService ) {

  }

  // -------------------------------------------------------------------------------------
  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
  }

  // -------------------------------------------------------------------------------------
  ngOnInit() {
    this.workout = this.navParams.get('workout');

    this.workoutSub = this.workoutService.findAllExercisesForWorkout(this.workout.url)
      .do(console.log)
      .subscribe(
        exercises => this.workoutExercises = exercises
      );
  }

  // -------------------------------------------------------------------------------------
  ngOnDestroy() {
    this.workoutSub.unsubscribe();
  }

  // -------------------------------------------------------------------------------------
  onEditWorkout() {
    
  }

  // -------------------------------------------------------------------------------------
  onLoad(index: number) {
    this.navCtrl.push(ExercisePage, { workout: this.workout, exercise: this.workoutExercises[index]});

  }
 
}
