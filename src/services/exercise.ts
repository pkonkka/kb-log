import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Exercise } from '../models/exercise';

@Injectable()
export class ExerciseService {

    exercises: Exercise[] = [];
    
    constructor(private http: Http, private authService: AuthService) {}

    // ------------------------------------------------------------------
    loadAllExercises(token: string): Observable<Exercise[]> {


        const userId = this.authService.getCurrentUser().uid;

        return this.http.get(
            'https://gym-log-33bb9.firebaseio.com/users/' + userId + 
            '/exercises.json?auth=' + token,
            this.exercises)
            .map((response: Response) => {
                const resp = response.json();
                this.exercises = Object.keys(resp).map(function(key) { return resp[key]; });
                return this.exercises; 
            })
            .do((data) => {
                this.exercises = data;
            });
        
    }

    // ------------------------------------------------------------------
    getAllExercises() {
        return this.exercises.slice();
    }

}