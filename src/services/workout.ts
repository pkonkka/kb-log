import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { AuthService } from '../services/auth';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';

@Injectable()
export class WorkoutService {

    private workouts$: FirebaseListObservable<Workout[]>;
    private userUrl;
    private workoutUrl;

    // -------------------------------------------------------------------------------------------------
    //  Set paths and observable
    // -------------------------------------------------------------------------------------------------        
    constructor(private db: AngularFireDatabase, private authService: AuthService) {

        this.userUrl = 'users/' + this.authService.getCurrentUser().uid + '/';
        this.workoutUrl = this.userUrl + 'workouts';
        this.workouts$ = this.db.list(this.workoutUrl);

    }

    // -------------------------------------------------------------------------------------------------
    //  Get all workouts from the database
    // -------------------------------------------------------------------------------------------------    
    findAllWorkouts(): Observable<Workout[]> {

        return this.workouts$.map(Workout.fromJsonArray);

    }

    // -------------------------------------------------------------------------------------------------
    //  Get five first workouts, ordered by url
    // -------------------------------------------------------------------------------------------------    
    loadFirstWorkoutsPage(pageSize = 5): Observable<Workout[]> {

        this.workouts$ = this.db.list(this.workoutUrl, {
            query: {
                orderByChild: 'url',
                limitToFirst: pageSize
            }
        });
        return this.workouts$.map(Workout.fromJsonArray);

    }

    // -------------------------------------------------------------------------------------------------
    //  Get a workout by an url
    // -------------------------------------------------------------------------------------------------    
    findWorkoutByUrl(workoutUrl: string): Observable<Workout> {
        return this.db.list(this.workoutUrl, {
            query: {
                orderByChild: 'url',
                equalTo: workoutUrl
            }
        })
        .map(results => results[0])
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // -------------------------------------------------------------------------------------------------
    // Find an workout by an workout key
    // -------------------------------------------------------------------------------------------------
    findWorkoutByKey(workoutKey: string): Observable<Exercise> {

        return this.db.list(this.workoutUrl, {
            query: {
                $key: workoutKey
            }
        })
        .map(results => results[0]);
    }
    
    // -------------------------------------------------------------------------------------------------
    //  Get the exercise keys per workout url
    // -------------------------------------------------------------------------------------------------    
    findExerciseKeysPerWorkoutUrl(
        workoutUrl: string,
        query: FirebaseListFactoryOpts = {}): Observable<string[]> {
            return this.findWorkoutByUrl(workoutUrl)
                .filter(workout => !!workout)
                .switchMap(workout => this.db.list(`${this.workoutUrl}/${workout.$key}/exercises`, query))
                .map(lspc => lspc.map(lpc => lpc.$key));
        }

    // -------------------------------------------------------------------------------------------------
    //  Get an exercise based an exercise key
    // -------------------------------------------------------------------------------------------------    
    findExercisesForExerciseKeys(exerciseKeys$: Observable<string[]>): Observable<Exercise[]> {
        return exerciseKeys$
            .map(lspc => lspc.map(exerciseKey => this.db.object(this.userUrl + 'exercises/' + exerciseKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs));

    }

    // -------------------------------------------------------------------------------------------------
    //  Get all exercises for a workout
    // -------------------------------------------------------------------------------------------------    
    findAllExercisesForWorkout(workoutUrl: string): Observable<Exercise[]> {
        return this.findExercisesForExerciseKeys(this.findExerciseKeysPerWorkoutUrl(workoutUrl));
    }

    // -------------------------------------------------------------------------------------------------
    //  Get only the first page
    // -------------------------------------------------------------------------------------------------
    loadFirstExercisesPage(workoutUrl: string, pageSize: number): Observable<Exercise[]> {

        const firstPageExerciseKeys$ = this.findExerciseKeysPerWorkoutUrl(workoutUrl,
            {
                query: {
                    limitToFirst: pageSize
                }
            });

        return this.findExercisesForExerciseKeys(firstPageExerciseKeys$);
    }


    // -------------------------------------------------------------------------------------------------
    //  Get next page
    // -------------------------------------------------------------------------------------------------    
    loadNextPage(workoutUrl: string, exerciseKey: string, pageSize: number): Observable<Exercise[]> {

        const exerciseKeys$ = this.findExerciseKeysPerWorkoutUrl(workoutUrl,
            {
                query: {
                    orderByKey: true,
                    startAt: exerciseKey,
                    limitToFirst: pageSize + 1
                }
            });

        return this.findExercisesForExerciseKeys(exerciseKeys$)
            .map(exercises => exercises.slice(1, exercises.length));
    }

    // -------------------------------------------------------------------------------------------------
    //  Get previous page
    // -------------------------------------------------------------------------------------------------    
    loadPreviousPage(workoutUrl: string, exerciseKey: string, pageSize: number): Observable<Exercise[]> {

        const exerciseKeys$ = this.findExerciseKeysPerWorkoutUrl(workoutUrl,
            {
                query: {
                    orderByKey: true,
                    endAt: exerciseKey,
                    limitToLast: pageSize + 1
                }
            });

        return this.findExercisesForExerciseKeys(exerciseKeys$)
            .map(exercises => exercises.slice(0, exercises.length - 1));

    }

    // -------------------------------------------------------------------------------------------------
    //  Create new workout item
    // -------------------------------------------------------------------------------------------------    
    createWorkout(data): firebase.Promise<any> {
        data.modifiedAt = data.createdAt = moment().format();
        return this.workouts$.push(data);
    }


    // -------------------------------------------------------------------------------------------------
    //  Remove a workout from the database
    // -------------------------------------------------------------------------------------------------    
    removeWorkout(workout: Workout): firebase.Promise<any> {
        return this.workouts$.remove(workout.$key);
    }


    // -------------------------------------------------------------------------------------------------
    //  Update a workout
    // -------------------------------------------------------------------------------------------------    
    updateWorkout(workoutKey: string, changes: any): firebase.Promise<any> {
        changes.modifiedAt = moment().format();
        return this.workouts$.update(workoutKey, changes);

    }


}