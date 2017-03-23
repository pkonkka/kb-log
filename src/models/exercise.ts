import { Workout } from './workout';
import { Category } from './category';


export class Exercise {
    
    constructor(
        public $key,
        public name: string, 
        public note: string, 
        public url: string,
        public workouts: Workout[],
        public categories: Category[],
        public workoutId: string,
        public createdAt: string,
        public modifiedAt: string) {

        }

}