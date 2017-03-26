import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Exercise } from '../../models/exercise';

@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html'
})
export class ExercisePage {

  exercise: Exercise;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.exercise = this.navParams.get('exercise');    
    console.log(this.exercise);
  }

}
