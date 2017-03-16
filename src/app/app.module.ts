import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WorkoutsPage } from '../pages/workouts/workouts';
import { ExercisesPage } from '../pages/exercises/exercises';
import { CategoriesPage } from '../pages/categories/categories';
import { StatsPage } from '../pages/stats/stats';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { CategoryEditPage } from '../pages/category-edit/category-edit';
import { ExerciseEditPage } from '../pages/exercise-edit/exercise-edit';
import { WorkoutEditPage } from '../pages/workout-edit/workout-edit';


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
    TabsPage
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
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
