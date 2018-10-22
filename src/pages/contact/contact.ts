import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { EjerciciosProvider } from "../../providers/ejercicios/ejercicios"

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {

	private db: any;
	rut: string;
	rutina: any;
	TipoEjercicio: any;
	key: string;
	model: any = {};
	nombreTipo: string;
	Ejercicio: any;

	seleccionatipo(TipoEjercicio) {
		this.nombreTipo = TipoEjercicio;
		this.Ejercicio = this.TipoEjercicio.find(ejer => ejer.tipo == TipoEjercicio).ejercicio;
	}

	agregar() {
		let rutina = {
			numero: this.rutina.length + 1, 
			orden: this.rutina.length + 1,
			tipo: this.isundefinied(this.nombreTipo),
			maquina: this.isundefinied(this.model.numero),
			asiento: this.isundefinied(this.model.asiento),
			apoyo: this.isundefinied(this.model.apoyo),
			serie: this.isundefinied(this.model.serie),
			repeticion: this.isundefinied(this.model.repeticion),
			carga: this.isundefinied(this.model.carga)
		}
		this.rutina.push(rutina)

		var rutejer = {
			rut: this.rut,
			rutina: this.rutina
		}

		this.updateDocument("RutinaCompleta", this.key, rutejer).then(() => {
			
		});
	}

	isundefinied(variable) {
		return typeof variable === "undefined" ? null : variable;
	}

	ionViewWillEnter() {
		this.storage.get('rut').then((val) => {
			this.cargaRutina(val).then(response => {
				this.rutina = response[0].rutina;
				this.key = response[0].$key;
			})
			this.rut = val;
		});
  	}


	constructor(public navCtrl: NavController, public storage: Storage, public ejercic: EjerciciosProvider) {
		this.db = firebase.firestore();
		this.db.settings({ timestampsInSnapshots: false });
		this.storage.get('rut').then((val) => {
			this.cargaRutina(val).then(response => {
				this.rutina = response[0].rutina;
				this.key = response[0].$key;
			})
			this.rut = val;
		});
		this.TipoEjercicio = ejercic.get();
	}

	reorderItems(indexes) {
		let element = this.rutina[indexes.from];
		this.rutina.splice(indexes.from, 1);
		this.rutina.splice(indexes.to, 0, element);

		var rutejer = {
			rut: this.rut,
			rutina: this.rutina
		}

		this.updateDocument("RutinaCompleta", this.key, rutejer).then(() => {
			
		});
	}

	cargaRutina(rut: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.collection("RutinaCompleta")
				.where("rut", "==", rut)
				.get()
				.then((querySnapshot) => {
					let arr = [];
					querySnapshot.forEach(function(doc) {
						var obj = JSON.parse(JSON.stringify(doc.data()));
						obj.$key = doc.id
						arr.push(obj);
					});

					if (arr.length > 0) {
						resolve(arr);
					} else {
						resolve(null);
					}
				})
				.catch((error: any) => {
					reject(error);
				});
		});

	}

	updateDocument(collectionName: string, docID: string, dataObj: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db
				.collection(collectionName)
				.doc(docID)
				.update(dataObj)
				.then((obj: any) => {
					resolve(obj);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	eliminar(index){

		this.rutina.splice(index,1)

		var rutejer = {
			rut: this.rut,
			rutina: this.rutina
		}

		this.updateDocument("RutinaCompleta", this.key, rutejer).then(() => {
			
		});
	}

}
