import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  private db: any;
  messages: any;
  model: any = {};
  isEditing: boolean = false;
  ordenEjercicio: number;
  maquina: number;
  tipo: string;
  asiento: number;
  apoyo: number;
  serie: number;
  repeticion: number;
  carga: number;
  n: number = 0;
  stopCondition: boolean = false;
  fechahora: any;
  btnIniciar = false;
  btnGuardar = true;
  btnPausar = true;
  btnReiniciar = true;
  rut: string;
  rutina: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: false });
    this.storage.get('rut').then((val) => {
      this.cargaRutina(val).then(response => {
        this.rutina = response;
      })
      this.rut = val;
      this.model.rut = this.rut;
    });
    this.btnIniciar = true;
  }

  ionViewWillEnter() {
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

  addMessage() {
    if (!this.isEditing) {
      this.addDocument("messages", this.model).then(() => {
        const alert = this.alertCtrl.create({
          title: 'Información',
          message: 'El entrenamiento a sido almacenado correctamente!',
          buttons: ['OK']
        });
        alert.present();

        this.btnIniciar = true;
        this.btnPausar = true;
        this.btnReiniciar = true;
        this.btnGuardar = true;
      });
    }
    this.isEditing = false;
  }

  addDocument(collectionName: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  onChange(numeroEjercicio) {
    this.model = this.rutina.find(ejer => ejer.orden == numeroEjercicio);
    console.log(this.model);
    this.model.n = 0;
    this.btnIniciar = false;
    this.btnPausar = true;
    this.btnReiniciar = true;
    this.btnGuardar = true;
  }

  iniciar() {
    this.model.fechahora = new Date();
    this.stopCondition = false;
    Observable.interval(1000)
      .takeWhile(() => !this.stopCondition)
      .subscribe(i => {
        this.model.n = parseInt(this.model.n) + 1;
      })
    this.btnIniciar = true;
    this.btnPausar = false;
    this.btnReiniciar = false;

  }

  pausar() {
    this.stopCondition = true;
    this.btnIniciar = false;
    this.btnPausar = true;
    this.btnGuardar = false;
  }

  reiniciar() {
    this.model.n = 0;
  }

}
