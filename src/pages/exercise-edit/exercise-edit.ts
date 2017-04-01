import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { generateUrl } from '../../shared/generate-url';

import { Exercise } from '../../models/exercise';
import { ExercisePage } from '../exercise/exercise';
import { ExerciseService } from '../../services/exercise';

@Component({
  selector: 'page-exercise-edit',
  templateUrl: 'exercise-edit.html'
})
export class ExerciseEditPage implements OnInit {
  
  mode = 'New';
  exercise: Exercise;
  exerciseForm: FormGroup;
  
  // ----------------------------------------------------------------------
  constructor(
      private navCtrl: NavController,
      private navParams: NavParams, 
      private viewCtrl: ViewController,
      private exerciseService: ExerciseService) {

  }

  // ----------------------------------------------------------------------
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.exercise = this.navParams.get('exercise');
    this.initForm(this.mode, this.exercise);
  }
  

  // ----------------------------------------------------------------------
  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
  }

  // ----------------------------------------------------------------------
  onSubmit() {

    const newExercise = this.exerciseForm.value;
    newExercise.url = generateUrl(newExercise.name);

    if (this.mode == 'Edit') {
      
      this.exerciseService.updateExercise(this.exercise.$key, newExercise)
        .then(
          () => {
            this.navCtrl.push(ExercisePage, {workout: newExercise});
          }
        )
        .catch(err => console.log('update failed: ', err));

    } else {

      this.exerciseService.createExercise(newExercise)
        .then(() => this.navCtrl.popToRoot())
        .catch(err => console.log(err));

    }

  }

  // ----------------------------------------------------------------------
  onRemove() {
    this.exerciseService.removeExercise(this.exercise)
      .then(() => this.navCtrl.popToRoot())
      .catch(err => console.log(err));
  }

  // ----------------------------------------------------------------------
  private initForm(mode: string, exercise: Exercise) {

    if (mode == 'New') {
      
      this.exerciseForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'note': new FormControl(null, Validators.required)
        // 'difficulty': new FormControl(this.selectOptions[1], Validators.required),
        // 'ingredients': new FormArray([])
      });
      
    } else {
      this.exerciseForm = new FormGroup({
        'name': new FormControl(exercise.name, Validators.required),
        'note': new FormControl(exercise.note, Validators.required)
        // 'difficulty': new FormControl(this.selectOptions[1], Validators.required),
        // 'ingredients': new FormArray([])
      });

    }

  }

}
