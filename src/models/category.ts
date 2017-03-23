import { Exercise } from './exercise';

export class Category {
    
    constructor(
        public name: string,
        public url: string,
        public exercises: Exercise[],
        public createdAt: string,
        public modifiedAt: string) {

        }
}