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


	constructor(public navCtrl: NavController, public storage: Storage, public ejercic: EjerciciosProvider) {
		this.db = firebase.firestore();
		this.db.settings({ timestampsInSnapshots: false });
		this.storage.get('rut').then((val) => {
			this.cargaRutina(val).then(response => {
				this.rutina = response;
			})
			this.rut = val;
		});
		this.TipoEjercicio = ejercic.get();
	}

	reorderItems(indexes) {
		let element = this.rutina[indexes.from];
		this.rutina.splice(indexes.from, 1);
		this.rutina.splice(indexes.to, 0, element);
	}

	cargaRutina(rut: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.collection("rutina")
				.where("rut", "==", rut)
				.orderBy("orden", "asc")
				.limit(1000)
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

}
