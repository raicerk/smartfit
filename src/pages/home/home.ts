import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any;
  private db: any;
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

  ejercicios: any = [
    {
      orden: 1,
      tipo: "Tronco",
      maquina: 25,
      asiento: 5,
      apoyo: null,
      serie: 3,
      repeticion: 12,
      carga: 20
    },
    {
      orden: 2,
      tipo: "Tronco",
      maquina: 30,
      asiento: 5,
      apoyo: 5,
      serie: 3,
      repeticion: 12,
      carga: 20
    },
    {
      orden: 3,
      tipo: "Brazos",
      maquina: 50,
      asiento: 7,
      apoyo: null,
      serie: 3,
      repeticion: 12,
      carga: 15
    },
    {
      orden: 4,
      tipo: "Brazos",
      maquina: 53,
      asiento: 6,
      apoyo: null,
      serie: 4,
      repeticion: 10,
      carga: 10
    },
    {
      orden: 5,
      tipo: "Piernas",
      maquina: 1,
      asiento: 3,
      apoyo: 5,
      serie: 4,
      repeticion: 12,
      carga: 60
    },
    {
      tipo: "Abdominal/Lumbar",
      orden: 6,
      maquina: 40,
      asiento: null,
      apoyo: null,
      serie: 4,
      repeticion: 20,
      carga: 20
    }
  ]

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public storage: Storage) {
    this.db = firebase.firestore();
    this.storage.get('rut').then((val) => {
      this.rut = val;
      this.model.rut = this.rut;
    });
    this.btnIniciar = true;
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
    this.model.maquina = this.ejercicios[numeroEjercicio - 1].maquina;
    this.model.tipo = this.ejercicios[numeroEjercicio - 1].tipo;
    this.model.asiento = this.ejercicios[numeroEjercicio - 1].asiento;
    this.model.apoyo = this.ejercicios[numeroEjercicio - 1].apoyo;
    this.model.serie = this.ejercicios[numeroEjercicio - 1].serie;
    this.model.repeticion = this.ejercicios[numeroEjercicio - 1].repeticion;
    this.model.carga = this.ejercicios[numeroEjercicio - 1].carga;
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
