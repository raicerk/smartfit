import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HistorialPage } from '../historial/historial';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HistorialPage;
  tab3Root = ContactPage;

  constructor(public navParams: NavParams) {
  }
}
