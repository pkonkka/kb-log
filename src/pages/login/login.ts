import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {}

  // -------------------------------------------------------------
  onLogin(form: NgForm) {

    const loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present();

    this.authService.login(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Loginn failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
    
  }

}

