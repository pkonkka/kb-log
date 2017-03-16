import { Component } from '@angular/core';
@Component({
  selector: 'page-workout-edit',
  templateUrl: 'workout-edit.html'
})
export class WorkoutEditPage {

  onSaveWorkout() {
    console.log('onSaveWorkout');
  }


}
