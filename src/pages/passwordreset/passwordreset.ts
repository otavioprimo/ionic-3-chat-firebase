import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserProvider, public alertCtrl: AlertController) {
  }

  reset() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.userService.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password');
      }
      else {
        alert.setTitle('Failed');
      }
    }).catch(err => {
      if (err.code === 'auth/user-not-found') {
        let alert = this.alertCtrl.create({
          title: 'Not found',
          message: 'There is no account with this email',
          buttons: ['Ok']
        });

        alert.present();
      }
      console.log(err);
    })
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}