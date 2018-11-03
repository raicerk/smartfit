import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import GoNFetch from 'go-n-fetch'
import { Storage } from '@ionic/storage';
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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login() {

    this.btnLogin = true;
    this.btnLoginText = "VALIDANDO..."

    const goNFetch = GoNFetch({
      baseUrl: 'http://localhost:8080',
      headers: {
        "Content-Type": "application/json"
      }
    })

    var response = await goNFetch.post(`/Login`, { body: JSON.stringify({ "rut": this.rut, "contrasena": this.contrasena }) });
    var data = await response.json();
    if (data.exito) {
      console.log(data)
      this.storage.set('rut', this.rut);
      this.storage.set('nombre', data.nombre);
      this.storage.set('plan', data.plan);
      this.storage.set('sucursal', data.sucursal);
      this.storage.set('pagos', data.pagos);
      this.navCtrl.setRoot(TabsPage);
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
