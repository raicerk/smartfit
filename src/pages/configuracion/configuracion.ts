import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { EjerciciosProvider } from "../../providers/ejercicios/ejercicios"


/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-configuracion',
	templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

	private db: any;
	model: any = {};
	nombreTipo: string;
	TipoEjercicio: any;
	Ejercicio: any;
	Rutina: Array<any> = [];
	rut: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public ejercic: EjerciciosProvider) {
		this.db = firebase.firestore();
		this.storage.get('rut').then((val) => {
			console.log(`home : ${val}`);
			this.rut = val;
		});
		this.TipoEjercicio = ejercic.get();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ConfiguracionPage');
	}

	seleccionatipo(IdTipo) {
		this.Ejercicio = this.TipoEjercicio[IdTipo].ejercicio;
		this.nombreTipo = this.TipoEjercicio.find(ejer => ejer.id == IdTipo).tipo;
	}

	agregar() {
		let rutina = {
			rut: this.rut,
			orden: this.Rutina.length + 1,
			tipo: this.isundefinied(this.nombreTipo),
			maquina: this.isundefinied(this.model.numero),
			asiento: this.isundefinied(this.model.asiento),
			apoyo: this.isundefinied(this.model.apoyo),
			serie: this.isundefinied(this.model.serie),
			repeticion: this.isundefinied(this.model.repeticion),
			carga: this.isundefinied(this.model.carga)
		}
		this.Rutina.push(rutina)
	}

	isundefinied(variable) {
		return typeof variable === "undefined" ? null : variable;
	}

	guardarutina() {

		for (var i = 0; i < this.Rutina.length; i++) {

			var objeto = {
				rut: this.isundefinied(this.Rutina[i].rut),
				orden: this.isundefinied(this.Rutina[i].orden),
				tipo: this.isundefinied(this.Rutina[i].tipo),
				maquina: this.isundefinied(this.Rutina[i].maquina),
				asiento: this.isundefinied(this.Rutina[i].asiento),
				apoyo: this.isundefinied(this.Rutina[i].apoyo),
				serie: this.isundefinied(this.Rutina[i].serie),
				repeticion: this.isundefinied(this.Rutina[i].repeticion),
				carga: this.isundefinied(this.Rutina[i].carga),
			};

			this.addDocument("rutina", objeto).then(() => {

			});
		}

		const alert = this.alertCtrl.create({
			title: 'Información',
			message: 'La rutina a sido almacenada correctamente!',
			buttons: ['OK']
		});

		alert.present();
	}

	addDocument(collectionName: string, dataObj: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.collection(collectionName).add(dataObj).then((obj: any) => {
				resolve(obj);
			}).catch((error: any) => {
				reject(error);
			});
		});
	}

}
