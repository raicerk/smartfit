import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HistorialPage } from '../pages/historial/historial';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { InformePage } from '../pages/informe/informe';
import { UsuarioPage } from '../pages/usuario/usuario';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { IonicStorageModule } from '@ionic/storage';
import { EjerciciosProvider } from '../providers/ejercicios/ejercicios';

import { NombreEjercicioPipe } from '../pipes/nombre-ejercicio/nombre-ejercicio';
import { SecondtominutesPipe } from '../pipes/secondtominutes/secondtominutes'

const config = {
  apiKey: "AIzaSyDfufyZSQXEDy6XKcLwDyAtuHs5WvBgT4I",
  authDomain: "smartfit-16f6c.firebaseapp.com",
  databaseURL: "https://smartfit-16f6c.firebaseio.com",
  projectId: "smartfit-16f6c",
  storageBucket: "smartfit-16f6c.appspot.com",
  messagingSenderId: "526276590283"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HistorialPage,
    ContactPage,
    HomePage,
    InformePage,
    UsuarioPage,
    TabsPage,
    NombreEjercicioPipe,
    SecondtominutesPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HistorialPage,
    ContactPage,
    HomePage,
    InformePage,
    UsuarioPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EjerciciosProvider
  ]
})
export class AppModule {}
