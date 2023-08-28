import { Component } from '@angular/core';
import { Nota, Usuario } from 'src/model/estruturas';
import { NotasService } from './notas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuario: Usuario;

  constructor(private serv: NotasService) {
    this.serv.getUsuario().subscribe(res => {
      this.usuario = res;
    });
  }

}
