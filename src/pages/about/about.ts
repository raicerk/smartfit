import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private db: any;
  messages: any;
  model: any = {};
  isEditing: boolean = false;

  constructor(public navCtrl: NavController) {
    this.db = firebase.firestore();
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  sortByDate(arr) {
    arr.sort(function (a, b) {
      return Number(new Date(b.fechahora)) - Number(new Date(a.fechahora));
    });
    return arr;
  }

  loadData() {
    this.getAllDocuments("messages").then((e) => {
      if (e != null) {
        this.messages = this.sortByDate(e);
      }
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
