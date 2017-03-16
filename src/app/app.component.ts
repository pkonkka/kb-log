import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SettingsPage} from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  settingsPage = SettingsPage;
  tabsPage = TabsPage;

  @ViewChild('nav') nav: NavController;

  // ---------------------------------------------------------------------------------------------
  constructor(platform: Platform, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  // ---------------------------------------------------------------------------------------------
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

}
