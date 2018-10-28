import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

/**
 * Generated class for the InformePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-informe',
	templateUrl: 'informe.html',
})
export class InformePage {

	@ViewChild('barCanvas') barCanvas;

	rut: string;
	private db: any;
	agrupado: any;
	barChart: any;
	datos: any;
	messages: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
		this.storage.get('rut').then((val) => {
			this.rut = val;
			this.db = firebase.firestore();
		});
	}

	async ionViewWillEnter() {

		this.rut = await this.storage.get('rut')

		if (this.rut != "") {
			this.messages = await this.loadData();
			this.datos = this.agrupar(this.messages);
			//-------------------------------------------------------------
			var labels = [];
			var data = [];
			this.datos.forEach(function(element) {
				labels.push(element.fecha);
				data.push(element.sumatiempo/60);
			})

			this.barChart = new Chart(this.barCanvas.nativeElement, {

				type: 'horizontalBar',
				data: {
					labels: labels,
					datasets: [{
						backgroundColor: '#fbb813',
						borderColor: '#fbb813',
						borderWidth: 1,
						label: 'Tiempo de rutina (Minutos)',
						data: data
					}]
				},
				options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }

			});
			//-------------------------------------------------------------

			//#fbb813
		}










	}

	agrupar(datos) {
		var arreglo = [];
		var array = new Object();

		datos.forEach(function(element) {


			if (array["sumatiempo"] == undefined) {
				array["sumatiempo"] = 0;
			}


			if (array["fecha"] == element.fechahora.substr(0, 10).toString()) {
				array["sumatiempo"] = parseInt(array["sumatiempo"]) + parseInt(element.n);
			} else {
				arreglo.push(array)
				array = {}
				array["fecha"] = element.fechahora.substr(0, 10);
			}

		})
		arreglo.shift();
		return arreglo;

	}

	loadData() {
		return new Promise((resolve, reject) => {
			this.getAllDocuments("messages", this.rut).then((e) => {
				if (e != null) {
					resolve(e)
				}
			});
		})

	}

	getAllDocuments(collection: string, rut: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.db.collection(collection)
				.where("rut", "==", rut)
				.orderBy("fechahora", "desc")
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
