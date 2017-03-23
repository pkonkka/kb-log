
import { Exercise } from './exercise';

export class Workout {

    constructor(
        public $key: string,        
        public name: string, 
        public description: string,
        public url: string,
        public exercises: Exercise[],
        public createdAt: string,
        public modifiedAt: string) {
        }

}