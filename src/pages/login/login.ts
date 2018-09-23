import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
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
  btnLogin: boolean = false;
  btnLoginText: string = "INGRESAR";

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {

    this.btnLogin = true;
    this.btnLoginText = "VALIDANDO..."

    const goNFetch = GoNFetch({
      baseUrl: 'https://apismartfit.appspot.com/',
      headers: {
        "Content-Type": "application/json"
      }
    })

    var response = await goNFetch.post(`/Login`, { body: JSON.stringify({ "rut": this.rut, "contrasena": this.contrasena }) });
    var data = await response.json();
    if (data.exito) {
      this.navCtrl.setRoot(TabsPage, { rut: this.rut });
    } else {
      const alert = this.alertCtrl.create({
        title: 'Login',
        message: 'Usuario o contraseña incorrecta, intente nuevamente!',
        buttons: ['OK']
      });
      alert.present();
      this.btnLogin = false;
      this.btnLoginText = "INGRESAR";
    }
  }

}
