import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private db: any;
  messages: any;
  model: any = {};
  isEditing: boolean = false;
  rut: string;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.get('rut').then((val) => {
      this.rut = val;
      this.db = firebase.firestore();
      this.loadData();
    });

  }

  ionViewWillEnter() {
    this.loadData();
  }

  sortByDate(arr) {
    arr.sort(function(a, b) {
      return Number(new Date(b.fechahora)) - Number(new Date(a.fechahora));
    });
    return arr;
  }

  loadData() {
    this.getAllDocuments("messages", this.rut).then((e) => {
      if (e != null) {
        this.messages = this.sortByDate(e);
      }
    });
  }

  getAllDocuments(collection: string, rut: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
        .where("rut", "==", rut)
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function(doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id
            console.log(obj)
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
