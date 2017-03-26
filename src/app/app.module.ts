// import { AngularFireDatabase } from 'angularfire2';
import { AngularFireModule} from "angularfire2/index";

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { firebaseConfig, authConfig} from "../environments/firebase.config";


// pages
import { MyApp } from './app.component';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryEditPage } from '../pages/category-edit/category-edit';
import { ExercisesPage } from '../pages/exercises/exercises';
import { ExerciseEditPage } from '../pages/exercise-edit/exercise-edit';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MePage } from '../pages/me/me';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup'; 
import { StatsPage } from '../pages/stats/stats';
import { TabsPage } from '../pages/tabs/tabs';
import { WorkoutsPage } from '../pages/workouts/workouts';
import { WorkoutEditPage } from '../pages/workout-edit/workout-edit';

// pipes
import { ExerciseCountPipe } from '../pipes/exercise-count';
import { CapitalizePipe } from '../pipes/capitalize';
import { DatePipe } from '../pipes/date';

// services
import { AuthService } from '../services/auth';
import { ExerciseService } from '../services/exercise';
import { WorkoutService } from '../services/workout';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WorkoutsPage,
    WorkoutEditPage,
    ExercisesPage,
    ExerciseEditPage,
    CategoriesPage,
    CategoryEditPage,
    StatsPage,
    SettingsPage,
    TabsPage,
    MePage,
    LoginPage,
    SignupPage,
    ExerciseCountPipe,
    CapitalizePipe,
    DatePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, authConfig)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WorkoutsPage,
    WorkoutEditPage,
    ExercisesPage,
    ExerciseEditPage,
    CategoriesPage,
    CategoryEditPage,
    StatsPage,
    SettingsPage,
    TabsPage,
    MePage,
    LoginPage,
    SignupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthService,
  ExerciseService,
  WorkoutService]
})
export class AppModule {}
