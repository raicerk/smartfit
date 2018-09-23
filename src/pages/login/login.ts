import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import GoNFetch from 'go-n-fetch'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rut: string;
  contrasena: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    const goNFetch = GoNFetch({
      baseUrl: 'https://apismartfit.appspot.com/',
      headers: {
        "Content-Type": "application/json"
      }
    })
    var dato = {
        nav : this.navCtrl,
        rut : this.rut
    };
    goNFetch.post(`/Login`, { body: JSON.stringify({ "rut": this.rut, "contrasena": this.contrasena }) }).then(function(response, dato) {
      return response.json();
    }).then(function(data) {
      if (data.exito) {
        dato.nav.setRoot(TabsPage, {rut: dato.rut});
      }
    })
  }

}
