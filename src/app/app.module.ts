import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WorkoutsPage } from '../pages/workouts/workouts';
import { ExercisesPage } from '../pages/exercises/exercises';
import { CategoriesPage } from '../pages/categories/categories';
import { StatsPage } from '../pages/stats/stats';
import { SettingsPage } from '../pages/settings/settings';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WorkoutsPage,
    ExercisesPage,
    CategoriesPage,
    StatsPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WorkoutsPage,
    ExercisesPage,
    CategoriesPage,
    StatsPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
