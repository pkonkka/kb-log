import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from '../services/auth';

import 'rxjs/Rx';

import { Workout } from '../models/workout';

@Injectable()
export class WorkoutService {

    workouts: Workout[] = [];
    
    constructor(private http: Http, private authService: AuthService) {}

    // ------------------------------------------------------------------
    getAllWorkoutsFromDb(token: string) {

        const userId = this.authService.geCurrentUser().uid;

        return this.http.get(
            'https://gym-log-33bb9.firebaseio.com/users/' + userId + 
            '/workouts.json?auth=' + token,
            this.workouts)
            .map((response: Response) => {
               return response.json(); 
            })
            .do((data) => {
                this.workouts = data;
            });
        
    }

    // ------------------------------------------------------------------
    getAllWorkoutFromDevice() {
        return this.workouts.slice();
    }

}