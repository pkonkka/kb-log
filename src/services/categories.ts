import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import { Category } from '../models/category';
import { Exercise } from '../models/exercise';

import { generalUrl } from '../shared/general-url';

@Injectable()
export class CategoryService {

    private categories$: FirebaseListObservable<Category[]>;
    userId: string;
    

    // ------------------------------------------------------------------    
    constructor(private authService: AuthService) {

        this.userId = this.authService.getCurrentUser().uid;

    }


}

