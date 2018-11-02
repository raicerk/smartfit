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

		if (this.barChart != undefined) {
			this.barChart.destroy();
		}

		this.rut = await this.storage.get('rut')

		if (this.rut != "") {
			this.messages = await this.loadData();
			this.datos = await this.agrupar(this.messages);

			var labels = [];
			var data = [];
			this.datos.forEach(function(element) {
				labels.push(element.fecha);
				let s = element.sumatiempo
				let time = (s - (s %= 60)) / 60 + (9 < s ? '.' : '.0') + s;
				data.push(time);
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
					responsive: true,
					maintainAspectRatio: false,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}

			});
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
				array["sumatiempo"] = parseInt(element.n);
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
