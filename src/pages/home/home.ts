import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any;
  private db: any;
  model: any = {};
  isEditing: boolean = false;
  ValorCrono: string = "Empezar";
  txtCrono: any;
  ordenEjercicio: number;
  maquina: number;
  tipo: string;
  asiento: number;
  apoyo: number;
  serie: number;
  repeticion: number;
  carga: number;

  onChange(numeroEjercicio) {
    this.maquina = this.ejercicios[numeroEjercicio - 1].maquina;
    this.tipo = this.ejercicios[numeroEjercicio - 1].tipo;
    this.asiento = this.ejercicios[numeroEjercicio - 1].asiento;
    this.apoyo = this.ejercicios[numeroEjercicio - 1].apoyo;
    this.serie = this.ejercicios[numeroEjercicio - 1].serie;
    this.repeticion = this.ejercicios[numeroEjercicio - 1].repeticion;
    this.carga = this.ejercicios[numeroEjercicio - 1].carga;
  }

  ejercicios: any = [
    {
      orden: 1,
      tipo: "tronco",
      maquina: 25,
      asiento: 5,
      apoyo: null,
      serie: 3,
      repeticion: 12,
      carga: 15
    },
    {
      orden: 2,
      tipo: "tronco",
      maquina: 30,
      asiento: 5,
      apoyo: 5,
      serie: 3,
      repeticion: 12,
      carga: 15
    },
    {
      orden: 3,
      tipo: "brazos",
      maquina: 50,
      asiento: 7,
      apoyo: null,
      serie: 3,
      repeticion: 12,
      carga: 10
    },
    {
      orden: 4,
      tipo: "brazos",
      maquina: 53,
      asiento: 6,
      apoyo: null,
      serie: 4,
      repeticion: 10,
      carga: 5
    },
    {
      orden: 5,
      tipo: "piernas",
      maquina: 1,
      asiento: 3,
      apoyo: 5,
      serie: 4,
      repeticion: 12,
      carga: 50
    },
    {
      tipo: "Abdominal/Lumbar",
      orden: 6,
      maquina: 40,
      asiento: null,
      apoyo: null,
      serie: 4,
      repeticion: 20,
      carga: 15
    }
  ]


  constructor(public navCtrl: NavController) {
    this.db = firebase.firestore();
    this.loadData();
  }

  loadData() {
    this.getAllDocuments("messages").then((e) => {
      this.messages = e;
    });
  }

  addMessage() {
    if (!this.isEditing) {
      this.addDocument("messages", this.model).then(() => {
        this.loadData();//refresh view
      });
    } else {
      this.updateDocument("messages", this.model.$key, this.model).then(() => {
        this.loadData();//refresh view
      });
    }
    this.isEditing = false;
    //clear form
    this.model.title = '';
    this.model.text = '';
  }

  updateMessage(obj) {
    this.model = obj;
    this.isEditing = true;
  }

  deleteMessage(key) {
    this.deleteDocument("messages", key).then(() => {
      this.loadData();//refresh view
      this.isEditing = false;
    });
  }

  getAllDocuments(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function (doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id
            console.log(obj)
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }


        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  deleteDocument(collectionName: string, docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collectionName)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
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

}
