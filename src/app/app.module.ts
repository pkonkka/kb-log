// import { AngularFireDatabase } from 'angularfire2';
import { AngularFireModule} from "angularfire2/index";

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { firebaseConfig, authConfig} from "../environments/firebase.config";

// compoents
import { TestComponent } from '../components/test';


// pages
import { MyApp } from './app.component';
import { AddCategoriesPage } from '../pages/add-categories/add-categories';
import { AddExercisesPage } from '../pages/add-exercises/add-exercises';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryEditPage } from '../pages/category-edit/category-edit';
import { CategoryPage } from '../pages/category/category';
import { ExercisePage } from '../pages/exercise/exercise';
import { ExercisesPage } from '../pages/exercises/exercises';
import { ExerciseEditPage } from '../pages/exercise-edit/exercise-edit';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MePage } from '../pages/me/me';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup'; 
import { StatsPage } from '../pages/stats/stats';
import { TabsPage } from '../pages/tabs/tabs';
import { WorkoutPage } from '../pages/workout/workout';
import { WorkoutsPage } from '../pages/workouts/workouts';
import { WorkoutEditPage } from '../pages/workout-edit/workout-edit';
import { WorkoutsOptionsPage } from '../pages/workouts-options/workouts-options';
import { ExercisesOptionsPage } from '../pages/exercises-options/exercises-options';
import { CategoriesOptionsPage } from '../pages/categories-options/categories-options'; 

// pipes
import { ExerciseCountPipe } from '../pipes/exercise-count';
import { CapitalizePipe } from '../pipes/capitalize';
import { DatePipe } from '../pipes/date';

// services
import { AuthService } from '../services/auth';
import { CategoryService } from '../services/category';
import { ExerciseService } from '../services/exercise';
import { WorkoutService } from '../services/workout';


@NgModule({
  declarations: [
    MyApp,
    AddCategoriesPage,
    AddExercisesPage,
    CategoriesPage,
    CategoryEditPage,
    CategoryPage,
    ExercisePage,
    ExercisesPage,
    ExerciseEditPage,
    HomePage,
    LoginPage,    
    MePage,
    SettingsPage,
    SignupPage,     
    StatsPage,
    TabsPage,
    WorkoutsPage,
    WorkoutEditPage,
    WorkoutPage,
    WorkoutsOptionsPage,
    ExercisesOptionsPage,
    CategoriesOptionsPage,
    ExerciseCountPipe,
    CapitalizePipe,
    DatePipe,
    TestComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, authConfig)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddCategoriesPage,
    AddExercisesPage,    
    HomePage,
    WorkoutsPage,
    WorkoutEditPage,
    ExercisePage,
    ExercisesPage,
    ExerciseEditPage,
    CategoriesPage,
    CategoryEditPage,
    CategoryPage,
    StatsPage,
    SettingsPage,
    TabsPage,
    MePage,
    LoginPage,
    SignupPage,
    WorkoutPage,
    WorkoutsOptionsPage,
    ExercisesOptionsPage,
    CategoriesOptionsPage,
    
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthService,
  CategoryService,
  ExerciseService,
  WorkoutService]
})
export class AppModule {}
