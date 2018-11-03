import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UsuarioPage } from '../pages/usuario/usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { title: 'Acerca de', component: null, icon: 'alert' },
      { title: 'Usuario', component: UsuarioPage, icon: 'contact' },
      { title: 'Cerrar Sesión', component: null, icon: 'close' }
    ];

    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.icon == 'close') {
      this.nav.setRoot(LoginPage);
    } else {
      if (page.component != null) {
        this.nav.push(page.component);
      }
    }

  }
}
