import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Nota, Usuario } from 'src/model/estruturas';
import { NotasService } from '../notas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  mensagem: string;
  notas: Nota[];

  notaSelecionada: Nota;

  constructor(private serv: NotasService, private router: Router) {
    this.mensagem = 'teste';
  }

  /**
   * Método do ciclo de via do componente que é executado após a carga da view.
   * Importante para atualizar dados da lista.
   */
  ionViewDidEnter(): void {
    this.atualizar();
  }

  /**
   * Seleciona uma nota e envia para a página de edição
   * @param nota objeto selecionado e que será editado.
   */
  selecionaNota(nota: Nota): void {
    this.notaSelecionada = nota;
    this.router.navigate(['/tabs/tab2', nota.id]);
  }

  excluir(item): void {
    this.serv.excluir(item);
  }

  recuperar(item): void {
    this.serv.recuperar(item);
  }

  enviar(): void {
    this.serv.enviarDados().then(_ =>  {
      alert('Dados gravados com sucesso.');
    });
  }

  /**
   * Força atualização do array de notas
   */
  atualizar() {
    // this.serv.getUsuario().subscribe(res => {
    this.serv.getUsuario().then(res => {
      this.notas = res.notas;
      this.mensagem = this.serv.message;
    });
  }

  /**
   * Chama a limpeza de notas do service.
   */
  limpar() {
    this.serv.limpar();
    this.atualizar();
  }

}
