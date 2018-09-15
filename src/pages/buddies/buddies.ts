import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { connreq } from '../../models/interfaces/request';
import firebase from 'firebase';
import { RequestsProvider } from '../../providers/requests/requests';

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {
  temparr = [];
  filteredusers = [];
  newrequest = {} as connreq;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, private alertCtrl: AlertController,
    public requestservice: RequestsProvider) {
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    })
  }

  ionViewDidLoad() {

  }

  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient) {
      let alert = this.alertCtrl.create({
        title: 'Hey',
        subTitle:'You are your friend always',
        buttons:['OK']
      });

      alert.present();
    }
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });

      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }

}