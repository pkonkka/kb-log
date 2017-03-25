import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { Category } from '../models/category';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';

@Injectable()
export class ExerciseService {

    private exercises$: FirebaseListObservable<Exercise[]>;
    private userUrl;
    private exerciseUrl;
    

    // -------------------------------------------------------------------------------------------------
    //  Set paths and observable
    // -------------------------------------------------------------------------------------------------        
    constructor(private db: AngularFireDatabase, private authService: AuthService) {

        this.userUrl = 'users/' + this.authService.getCurrentUser().uid + '/';
        this.exerciseUrl = this.userUrl + 'exercises';
        this.exercises$ = this.db.list(this.exerciseUrl);

    }

    // -------------------------------------------------------------------------------------------------
    //  Get all exercises
    // -------------------------------------------------------------------------------------------------    
    findAllExercises(): Observable<Exercise[]> {
        return this.exercises$.map(Exercise.fromJsonArray);
    }
    
    // -------------------------------------------------------------------------------------------------
    // Find an exercise by an excerise url
    // -------------------------------------------------------------------------------------------------
    findExerciseByUrl(exerciseUrl: string): Observable<Exercise> {
        return this.db.list(this.exerciseUrl, {
            query: {
                orderByChild: 'url',
                equalTo: exerciseUrl
            }
        })
        .map(results => results[0]);
    }

    // -------------------------------------------------------------------------------------------------
    // Find an exercise by an excerise url
    // -------------------------------------------------------------------------------------------------
    findExerciseByKey(exerciseKey: string): Observable<Exercise> {

        return this.db.list(this.exerciseUrl, {
            query: {
                $key: exerciseKey
            }
        })
        .map(results => results[0]);
    }

    // -------------------------------------------------------------------------------------------------
    // Find all categories for an exercise
    // -------------------------------------------------------------------------------------------------
    findAllCategoriesForExercise(exerciseUrl: string): Observable<Category[]> {

        return this.findCategoriesForCategoryKeys(this.findCategoryKeysPerExerciseUrl(exerciseUrl));
    }

    // -------------------------------------------------------------------------------------------------
    // Find all workouts for an exercise
    // -------------------------------------------------------------------------------------------------
    findAllWorkoutsForExercise(exerciseUrl: string): Observable<Workout[]> {
        return this.findWorkoutsForWorkoutKeys(this.findWorkoutKeysPerExerciseUrl(exerciseUrl));
    }

    // -------------------------------------------------------------------------------------------------
    // Find all category keys for an exercise
    // -------------------------------------------------------------------------------------------------
    findCategoryKeysPerExerciseUrl(exerciseUrl: string,
                                   query: FirebaseListFactoryOpts = {}): Observable<string[]> {

        return this.findExerciseByUrl(exerciseUrl)
            .filter(exercise => !!exercise)
            .switchMap(exercise => this.db.list(`${this.exerciseUrl}/${exercise.$key}/categories`, query))
            .map( lspc => lspc.map(lpc => lpc.$key));

    }

    // -------------------------------------------------------------------------------------------------
    // Find all workout keys for an exercise
    // -------------------------------------------------------------------------------------------------
    findWorkoutKeysPerExerciseUrl(exerciseUrl: string,
                                   query: FirebaseListFactoryOpts = {}): Observable<string[]> {

        return this.findExerciseByUrl(exerciseUrl)
            .filter(exercise => !!exercise)
            .switchMap(exercise => this.db.list(`${this.exerciseUrl}/${exercise.$key}/workouts`, query)) 
            .map( lspc => lspc.map(lpc => lpc.$key));

    }

    // -------------------------------------------------------------------------------------------------
    findCategoriesForCategoryKeys(categoryKeys$: Observable<string[]>): Observable<Category[]> {
        return categoryKeys$
            .map(lspc => lspc.map(categoryKey => this.db.object(this.userUrl + 'categories/' + categoryKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs));

    }

    // -------------------------------------------------------------------------------------------------
    findWorkoutsForWorkoutKeys(workoutKeys$: Observable<string[]>): Observable<Workout[]> {
        return workoutKeys$
            .map(lspc => lspc.map(workoutKey => this.db.object(this.userUrl + 'workouts/' + workoutKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) );

    }

    // -------------------------------------------------------------------------------------------------
    //  Create new exercise item
    // -------------------------------------------------------------------------------------------------    
    createExercise(data): firebase.Promise<any> {
        data.modifiedAt = data.createdAt = moment().format();
        return this.exercises$.push(data);
    }

    // -------------------------------------------------------------------------------------------------
    //  Remove a exercise from the database
    // - exercises
    // - exercisesPerWorkout
    // - exercisesPerCategory
    // -------------------------------------------------------------------------------------------------    
    removeExercise(exercise: Exercise): firebase.Promise<any> {
        return this.db.list(this.exerciseUrl).remove(exercise.$key);
        // return this.exercises$.remove(exercise.$key);
    }

    // -------------------------------------------------------------------------------------------------
    //  Update a exercise
    // -------------------------------------------------------------------------------------------------    
    updateExercise(exerciseKey: string, changes: any): firebase.Promise<any> {
        changes.modifiedAt = moment().format();
        return this.exercises$.update(exerciseKey, changes);
    }


}