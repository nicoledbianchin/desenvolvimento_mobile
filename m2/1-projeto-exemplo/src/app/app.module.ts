import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({ // comandos com @ são diretivas de computação para o Angular
  declarations: [
    AppComponent // componente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [], // serviços a serem usados
  bootstrap: [AppComponent] // componente de inicialização da aplicação
})
export class AppModule { }
