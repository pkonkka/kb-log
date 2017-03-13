import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WorkoutsPage } from '../pages/workouts/workouts';
import { ExercisesPage } from '../pages/exercises/exercises';
import { CategoriesPage } from '../pages/categories/categories';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WorkoutsPage,
    ExercisesPage,
    CategoriesPage
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
    CategoriesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
