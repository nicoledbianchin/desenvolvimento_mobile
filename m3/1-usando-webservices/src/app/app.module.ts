import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DetalheNotaComponent } from './detalhe-nota/detalhe-nota.component';
import { SobreComponent } from './sobre/sobre.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { FormComponent } from './form/form.component';
import { VisualizacaoComponent } from './visualizacao/visualizacao.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DetalheNotaComponent,
    SobreComponent,
    AjudaComponent,
    FormComponent,
    VisualizacaoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // IMPORTANTE: tem que adicionar para usar campos de input vinculados com modelo
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
