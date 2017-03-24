import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../services/auth';
import { Workout } from '../models/workout';

@Injectable()
export class WorkoutService {

    workouts: Workout[] = [];
    
    constructor(private http: Http, private authService: AuthService) {}

    // ------------------------------------------------------------------
    // load workouts from firebase
    // ------------------------------------------------------------------    
    loadAllWorkouts(token: string): Observable<Workout[]> {

        const userId = this.authService.getCurrentUser().uid;

        return this.http.get(
            'https://gym-log-33bb9.firebaseio.com/users/' + userId + 
            '/workouts.json?auth=' + token,
            this.workouts)
            .map((response: Response) => {
                const resp = response.json();
                this.workouts = Object.keys(resp).map(function(key) { return resp[key]; });
                return this.workouts; 
            })
            .do((data) => {
                this.workouts = data;
            });
        
    }

    // ------------------------------------------------------------------
    // load workouts from device
    // ------------------------------------------------------------------    




    // ------------------------------------------------------------------
    // load workouts from memory
    // ------------------------------------------------------------------    
    getAllWorkouts() {
        return Observable.from(this.workouts);
    }




}