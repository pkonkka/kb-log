import { Component } from '@angular/core';

import { StatsPage } from '../stats/stats';
import { SettingsPage } from '../settings/settings';


@Component({
    selector: 'page-tabs',
    template: `
        <ion-tabs>
            <ion-tab [root]="statsPage" tabTitle="Stats" tabIcon="star"></ion-tab>
            <ion-tab [root]="settingsPage" tabTitle="Settings" tabIcon="book"></ion-tab>
        </ion-tabs>
    `
})
export class TabsPage {
    statsPage = StatsPage;
    settingsPage = SettingsPage;
}