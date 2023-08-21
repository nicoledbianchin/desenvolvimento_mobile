import { Component } from '@angular/core';
import { Nota, Usuario } from 'src/model/estruturas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mensagem: string;
  usuario: Usuario;

  titulo: string;
  texto: string;
  status: number;

  situacoes = [
    { desc: 'Ativa', val: 0},
    { desc: 'Inativa', val: 1}
  ];

  notaSelecionada: Nota;

  constructor() {
    this.mensagem = '';
    this.mock();
  }

  mock(): void {
    this.usuario = new Usuario('1', 'Fulano');
    this.usuario.email = 'fulano@tal.com';
    this.usuario.addNota(1, 'Primeira Nota');
    this.usuario.addNota(2, 'Segunda Nota');
    this.usuario.removerNota(2);
  }

  salvar(): void {
    this.usuario.inserirNota(this.titulo, this.texto, parseInt('' + this.status, 10));
  }

  selecionaNota(nota: Nota): void {
    this.notaSelecionada = nota;
  }

}
