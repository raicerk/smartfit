import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html'
})
export class HistorialPage {

  private db: any;
  messages: any;
  model: any = {};
  isEditing: boolean = false;
  rut: string;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get('rut').then((val) => {
      this.rut = val;
      this.db = firebase.firestore();
    });

  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.getAllDocuments("messages", this.rut).then((e) => {
      console.log("--------------------------------")
      console.log(e);
      console.log("--------------------------------")
      if (e != null) {
        this.messages = e;
      }
      console.log("********************************")
      console.log(this.messages);
      console.log("********************************")
    });
  }

  getAllDocuments(collection: string, rut: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .where("rut", "==", rut)
        .orderBy("fechahora","desc")
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
