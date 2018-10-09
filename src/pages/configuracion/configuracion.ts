import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

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
	TipoEjercicio: any = [
		{
			id: 0,
			tipo: "Piernas",
			ejercicio: [
				{
					numero: 1,
					nombre: "LEG PRESS"
				},
				{
					numero: 2,
					nombre: "LEG EXTENSION"
				},
				{
					numero: 3,
					nombre: "LEG CURL"
				},
				{
					numero: 4,
					nombre: "ABDUCTOR"
				},
				{
					numero: 5,
					nombre: "ADDUCTOR"
				},
				{
					numero: 6,
					nombre: "GLUTE"
				},
				{
					numero: 7,
					nombre: "ROTARY CALF"
				},
				{
					numero: 9,
					nombre: "LEG PRESS 450"
				}
			]
		},
		{
			id: 1,
			tipo: "Brazos",
			ejercicio: [
				{
					numero: 50,
					nombre: "SHOULDER PRESS"
				},
				{
					numero: 52,
					nombre: "ARM EXTENSION"
				},
				{
					numero: 53,
					nombre: "ARM CURL"
				},
				{
					numero: 54,
					nombre: "BANCO SCOTT"
				}
			]
		},
		{
			id: 2,
			tipo: "Tronco",
			ejercicio: [
				{
					numero: 20,
					nombre: "CHEST PRESS"
				},
				{
					numero: 22,
					nombre: "CHEST INCLINE"
				},
				{
					numero: 25,
					nombre: "PECTORAL"
				},
				{
					numero: 30,
					nombre: "LOW ROW"
				},
				{
					numero: 32,
					nombre: "PULLEY/PULL DOWN"
				},
				{
					numero: 34,
					nombre: "LAT MACHINE"
				}
			]
		},
		{
			id: 3,
			tipo: "Abdominal/Lumbar",
			ejercicio: [
				{
					numero: 40,
					nombre: "ABD. CRUNCH"
				},
				{
					numero: 43,
					nombre: "LOWER BACK"
				},
				{
					numero: 54,
					nombre: "LOWER BACK BENCH"
				}
			]
		}
	]
	Ejercicio: any;
	Rutina: Array<any> = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
		this.db = firebase.firestore();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ConfiguracionPage');
	}

	seleccionatipo(IdTipo) {
		this.Ejercicio = this.TipoEjercicio[IdTipo].ejercicio;
	}


	seleccionaejercicio(NumeroEjercicio) {
	}

	agregar() {

		this.Rutina.push(
			{
				orden: this.Rutina.length + 1,
				tipo: this.isundefinied(this.model.tipo),
				maquina: this.isundefinied(this.model.numero),
				asiento: this.isundefinied(this.model.asiento),
				apoyo: this.isundefinied(this.model.apoyo),
				serie: this.isundefinied(this.model.serie),
				repeticion: this.isundefinied(this.model.repeticion),
				carga: this.isundefinied(this.model.carga)
			}
		)
		console.log(this.Rutina)
	}

	isundefinied(variable) {
		return typeof variable === "undefined" ? null : variable;
	}

	guardarutina() {

		for (var i = 0; i < this.Rutina.length; i++) {

			var objeto = {
				orden: this.isundefinied(this.Rutina[i].orden),
				tipo: this.isundefinied(this.Rutina[i].tipo),
				maquina: this.isundefinied(this.Rutina[i].numero),
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
