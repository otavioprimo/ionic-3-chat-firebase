import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from '../../models/interfaces/usercreds';

@Injectable()
export class AuthProvider {

  constructor(public afireAuth: AngularFireAuth) {

  }

  login(credentials: usercreds) {
    return new Promise((resolve, reject) => {
      this.afireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => resolve(true))
        .catch(err => reject(err));
    })
  }

}
