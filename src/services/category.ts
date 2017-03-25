import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { Category } from '../models/category';
import { Exercise } from '../models/exercise';


@Injectable()
export class CategoryService {

    private categories$: FirebaseListObservable<Category[]>;

    private userUrl;
    private categoryUrl;
    
    // -------------------------------------------------------------------------------------------------
    //  Set path and Observable
    // -------------------------------------------------------------------------------------------------        
    constructor(private db: AngularFireDatabase, private authService: AuthService) {

        this.userUrl = 'users/' + this.authService.getCurrentUser().uid + '/';
        this.categoryUrl = this.userUrl + 'categories';
        this.categories$ = this.db.list(this.categoryUrl);

    }

    // -------------------------------------------------------------------------------------------------
    //  Create new category item
    // -------------------------------------------------------------------------------------------------    
    createCategory(data): firebase.Promise<any> {
        data.modifiedAt = data.createdAt = moment().format();
        return this.categories$.push(data);
    }

    // -------------------------------------------------------------------------------------------------
    //  Get all categories
    // -------------------------------------------------------------------------------------------------    
    findAllCategories(): Observable<Category[]> {

        return this.categories$.map(Category.fromJsonArray);

    }

    // -------------------------------------------------------------------------------------------------
    // Find a category by category key
    // -------------------------------------------------------------------------------------------------
    findCategoryByKey(categoryKey: string): Observable<Exercise> {

        return this.db.list(this.categoryUrl, {
            query: {
                $key: categoryKey
            }
        })
        .map(results => results[0]);
    }

    // -------------------------------------------------------------------------------------------------
    // Find a category by an excerise url
    // -------------------------------------------------------------------------------------------------
    findCategoryByUrl(categoryUrl: string): Observable<Category> {
        return this.db.list(this.categoryUrl, {
        query: {
            orderByChild: 'url',
            equalTo: categoryUrl
        }
        })
        .map(results => results[0]);
    }

    // -------------------------------------------------------------------------------------------------
    //  Get all exercises for a workout
    // -------------------------------------------------------------------------------------------------    
    findAllExercisesForCategory(categoryUrl: string): Observable<Exercise[]> {

        return this.findExercisesForExerciseKeys(this.findExerciseKeysPerCategoryUrl(categoryUrl));

    }
  
    // -------------------------------------------------------------------------------------------------
    //  Get an exercise based an exercise key
    // -------------------------------------------------------------------------------------------------    
    findExercisesForExerciseKeys(exerciseKeys$: Observable<string[]>): Observable<Exercise[]> {
        return exerciseKeys$
            .map(lspc => lspc.map(exerciseKey => this.db.object(this.userUrl + 'exercises/' + exerciseKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) );

    }

    // -------------------------------------------------------------------------------------------------
    //  Get the exercise keys per workout url
    // -------------------------------------------------------------------------------------------------    
    findExerciseKeysPerCategoryUrl(categoryUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findCategoryByUrl(categoryUrl)
        .filter(category => !!category)
        .switchMap(category => this.db.list(`${this.categoryUrl}/${category.$key}/exercises`, query))
        .map(lspc => lspc.map(lpc => lpc.$key));
    }

    // -------------------------------------------------------------------------------------------------
    //  Remove a category from the database
    // -------------------------------------------------------------------------------------------------    
    removeCategory(category: Category): firebase.Promise<any> {
        return this.categories$.remove(category.$key);
    }

    // -------------------------------------------------------------------------------------------------
    //  Update a category
    // -------------------------------------------------------------------------------------------------    
    updateCategory(category: Category, changes: any): firebase.Promise<any> {
        changes.modifiedAt = moment().format();
        return this.categories$.update(category.$key, changes);
    }

}

