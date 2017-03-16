import { Component } from '@angular/core';
@Component({
  selector: 'page-exercise-edit',
  templateUrl: 'exercise-edit.html'
})
export class ExerciseEditPage {
  mode = 'New';

  
  // ------------------------------------------------------------------------------------
  initForm() {

  }
  
  // ------------------------------------------------------------------------------------  
  onSaveExercise() {
    console.log('saving...');
  }

}
