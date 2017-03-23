import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ExercisesPage } from '../exercises/exercises';
import { WorkoutsPage } from '../workouts/workouts';
import { StatsPage } from '../stats/stats';
import { MePage } from '../me/me';


@Component({
    selector: 'page-tabs',
    template: `
        <ion-tabs>
            <ion-tab [root]="homePage" tabIcon="home"></ion-tab>                    
            <ion-tab [root]="workoutsPage" tabTitle="Workouts" tabIcon="list"></ion-tab>        
            <ion-tab [root]="exercisesPage" tabTitle="Exercises" tabIcon="body"></ion-tab>                    
            <ion-tab [root]="statsPage" tabTitle="Stats" tabIcon="stats"></ion-tab>
            <ion-tab [root]="mePage" tabTitle="Me" tabIcon="person"></ion-tab>            
        </ion-tabs>
    `
})
export class TabsPage {
    homePage = HomePage;
    workoutsPage = WorkoutsPage;
    exercisesPage = ExercisesPage;
    statsPage = StatsPage;
    mePage = MePage;

}