import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBY7Ft5_n0vl01E7lC6LRBYJJ3Q16GTJao',
  authDomain: 'minha-localizacao-8d710.firebaseapp.com',
  projectId: 'minha-localizacao-8d710',
  storageBucket: 'minha-localizacao-8d710.appspot.com',
  messagingSenderId: '282086747121',
  appId: '1:282086747121:web:1c663aa997e370b0c83250',
  measurementId: 'G-V59XFWF4VP'
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
