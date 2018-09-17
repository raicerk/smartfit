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

  inicio: any =0;
  timeout: any = 0;
  vuelta : any;
  actual: any;
  diff: any;

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

  
 
	empezarDetener()
	{
		if(this.timeout==0)
		{
			// empezar el cronometro
      this.ValorCrono = "Detener";
 
			// Obtenemos el valor actual
      this.inicio= this.vuelta = new Date().getTime();
      console.log(this.inicio);
      console.log(this.vuelta);
      
      
 
			// iniciamos el proceso
			this.funcionando();
		}else{
			// detemer el cronometro
      this.ValorCrono = "Empezar";
			clearTimeout(this.timeout);
			this.timeout=0;
		}
  }
  
  /* Funcion que pone un 0 delante de un valor si es necesario */
	LeadingZero(Time) {
		return (Time < 10) ? "0" + Time : + Time;
	}
 
	funcionando()
	{
		// obteneos la fecha actual
    this.actual = new Date().getTime();
    console.log(this.actual);
    
 
		// obtenemos la diferencia entre la fecha actual y la de inicio
    this.diff=new Date(this.actual-this.inicio);
    console.log(this.diff);
    
    
 
		// mostramos la diferencia entre la fecha actual y la inicial
		var result= this.LeadingZero(this.diff.getUTCHours())+":"+this.LeadingZero(this.diff.getUTCMinutes())+":"+this.LeadingZero(this.diff.getUTCSeconds());
    this.txtCrono = result;
 
		// Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
		this.timeout=setTimeout(this.funcionando,1000);
	}
 
	

}
