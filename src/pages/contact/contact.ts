import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  n: number = 0;
  stopCondition: boolean = false;

  constructor(public navCtrl: NavController) {
  }

  iniciar() {
    this.stopCondition = false;
    Observable.interval(1000)
      .takeWhile(() => !this.stopCondition)
      .subscribe(i => {
        this.n = this.n + 1;
      })
  }

  pausar() {
    this.stopCondition = true;
  }

  resetear(){
    this.n = 0;
  }

}
