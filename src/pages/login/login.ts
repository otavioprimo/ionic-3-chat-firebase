import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as usercreds;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, private alertCtrl: AlertController) {
    this.credentials.email = 'otavioprimo@hotmail.com';
    this.credentials.password = '5886630';
  }

  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot('TabsPage');
      else
        alert(res);
    }).catch(err => {
      console.log(err);
      let alert = this.alertCtrl.create({
        subTitle: 'Email ou Senha inválidos',
        buttons: ['OK']
      });

      alert.present();
    })
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
