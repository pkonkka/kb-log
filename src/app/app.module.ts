import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// pages
import { MyApp } from './app.component';
import { CategoriesPage } from '../pages/categories/categories';
import { CategoryEditPage } from '../pages/category-edit/category-edit';
import { ExercisesPage } from '../pages/exercises/exercises';
import { ExerciseEditPage } from '../pages/exercise-edit/exercise-edit';
import { HomePage } from '../pages/home/home';
import { MePage } from '../pages/me/me';
import { SettingsPage } from '../pages/settings/settings';
import { StatsPage } from '../pages/stats/stats';
import { TabsPage } from '../pages/tabs/tabs';
import { WorkoutsPage } from '../pages/workouts/workouts';
import { WorkoutEditPage } from '../pages/workout-edit/workout-edit';

// services
import { AuthService } from '../services/auth';


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
    MePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    MePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthService]
})
export class AppModule {}
