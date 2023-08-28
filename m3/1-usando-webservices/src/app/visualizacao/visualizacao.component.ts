import { Component, OnInit } from '@angular/core';
import { Nota, Usuario } from 'src/model/estruturas';
import { NotasService } from '../notas.service';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.css']
})
export class VisualizacaoComponent implements OnInit {
  mensagem: string;
  usuario: Usuario;

  notaSelecionada: Nota;

  constructor(private serv: NotasService) {
    this.mensagem = '';
    this.serv.getUsuario().subscribe(res => {
      this.usuario = res;
    });

  }

  ngOnInit(): void {
  }

  selecionaNota(nota: Nota): void {
    this.notaSelecionada = nota;
  }

  excluir(item): void {
    this.serv.excluir(item);
  }

  recuperar(item): void {
    this.serv.recuperar(item);
  }

  enviar(): void {
    this.serv.enviarDados();
  }

}
