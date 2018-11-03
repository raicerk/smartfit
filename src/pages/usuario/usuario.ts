import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-usuario',
	templateUrl: 'usuario.html',
})
export class UsuarioPage {

	rut: string;
	nombre: string;
	plan: string;
	pagos: string;
	sucursal: string;


	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

		this.storage.get('rut').then((val) => {
			this.rut = val;
		});
		this.storage.get('nombre').then((val) => {
			this.nombre = val;
		});
		this.storage.get('plan').then((val) => {
			this.plan = val;
		});
		this.storage.get('pagos').then((val) => {
			this.pagos = val;
		});
		this.storage.get('sucursal').then((val) => {
			this.sucursal = val;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UsuarioPage');
	}

}
