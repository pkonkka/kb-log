import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SettingsPage} from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  settingsPage = SettingsPage;
  tabsPage = TabsPage;

  loginPage = LoginPage;
  signupPage = SignupPage;
  isAuthenticated = false;  

  @ViewChild('nav') nav: NavController;

  // ---------------------------------------------------------------------------------------------
  constructor(
    platform: Platform, 
    private menuCtrl: MenuController,
    private authService: AuthService) {

    firebase.initializeApp({
      apiKey: "AIzaSyAGbsGG6sSFz4GkcHLIKHHJ7UUtLsEYNhs",
      authDomain: "gym-log-33bb9.firebaseapp.com",
      databaseURL: "https://gym-log-33bb9.firebaseio.com",
      storageBucket: "gym-log-33bb9.appspot.com",
      messagingSenderId: "741736257105"       
    });      

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = LoginPage;
      }
    });    

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

  // --------------------------------------------------------------------
  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }

}
