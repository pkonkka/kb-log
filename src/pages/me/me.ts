import { Component } from '@angular/core';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  email: string;

  // -----------------------------------------------------------
  constructor(private authService: AuthService) {}


  // -----------------------------------------------------------
  ionViewWillEnter() {
    this.email = this.authService.getCurrentUser().email;
    console.log('email: ', this.email);
  }

}
