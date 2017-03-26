import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { generateUrl } from '../../shared/generate-url';
 
import { Workout } from '../../models/workout';
import { WorkoutService } from '../../services/workout';

@Component({
  selector: 'page-workout-edit',
  templateUrl: 'workout-edit.html'
})
export class WorkoutEditPage implements OnInit {

  mode: string = 'New';
  workout: Workout;
  workoutForm: FormGroup;

  // ----------------------------------------------------------------------
  constructor(
    private viewCtrl: ViewController, 
    private navParams: NavParams,
    private workoutService: WorkoutService) {}


  // ----------------------------------------------------------------------
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.workout = this.navParams.get('workout');
    this.initForm(this.mode, this.workout);
  }

  // ----------------------------------------------------------------------
  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
  }

  // ----------------------------------------------------------------------
  onSubmit() {

    const newWorkout = this.workoutForm.value;
    newWorkout.url = generateUrl(newWorkout.name);

    if (this.mode == 'Edit') {
      this.workoutService.updateWorkout(this.workout.$key, newWorkout);
    } else {
      this.workoutService.createWorkout(newWorkout);
    }
  }

  // ----------------------------------------------------------------------
  private initForm(mode: string, workout: Workout) {

    if (mode == 'New') {

      this.workoutForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required)
        // 'difficulty': new FormControl(this.selectOptions[1], Validators.required),
        // 'ingredients': new FormArray([])
      });
      
    } else {
      this.workoutForm = new FormGroup({
        'name': new FormControl(workout.name, Validators.required),
        'description': new FormControl(workout.description, Validators.required)
        // 'difficulty': new FormControl(this.selectOptions[1], Validators.required),
        // 'ingredients': new FormArray([])
      });

    }

  }


}
