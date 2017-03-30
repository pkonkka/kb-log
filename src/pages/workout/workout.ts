import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Subscription } from 'rxjs/Rx';

import { Exercise } from '../../models/exercise';
import { ExercisePage } from '../exercise/exercise';

import { Workout } from '../../models/workout';
import { WorkoutService } from '../../services/workout';
import { WorkoutEditPage } from '../workout-edit/workout-edit';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html'
})
export class WorkoutPage implements OnInit, OnDestroy {

  workout: Workout;
  workoutExercises: Exercise[];
  workoutSub: Subscription;


  // -------------------------------------------------------------------------------------
  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private viewCtrl: ViewController, 
    private workoutService: WorkoutService ) {

  }

  // -------------------------------------------------------------------------------------
  ionViewWillEnter() {

    this.viewCtrl.setBackButtonText('');
    this.workout = this.navParams.get('workout');

    this.workoutSub = this.workoutService.findAllExercisesForWorkout(this.workout.url)
      .subscribe(
        exercises => this.workoutExercises = exercises
      ); 
  }

  // -------------------------------------------------------------------------------------
  ngOnInit() {

  }

  // -------------------------------------------------------------------------------------
  ngOnDestroy() {
    this.workoutSub.unsubscribe();
  }

  // -------------------------------------------------------------------------------------
  onEditWorkout() {
    this.navCtrl.push(WorkoutEditPage, { workout: this.workout, mode: 'Edit'});    
  }

  // -------------------------------------------------------------------------------------
  onLoad(index: number) {
    this.navCtrl.push(ExercisePage, { workout: this.workout, exercise: this.workoutExercises[index]});
  }
 
}
