// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


import { Platform } from '@ionic/angular';
import { Nota, Usuario } from 'src/model/estruturas';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  // url = 'http://localhost:3000/';
  usuario: Usuario;
  message: string;

  // constructor(private http: HttpClient) {
  constructor(private platform: Platform, private nativeStorage: NativeStorage) {
    this.message = '';
  }

  defineUsuario(res) {
    this.usuario = new Usuario(res.id, res.nome);
    this.usuario.email = res.email;
    for (let index = 0; index < res.notas.length; index++) {
      const element = res.notas[index];
      const n = this.usuario.inserirNota(element.titulo, element.texto, element.status);
      n.modificacao = element.modificacao;
    }
    this.usuario.ultId = res.ultId;
    this.atualizarMensagem();
  }

  async getUsuario() {
    if (this.usuario) {
      return this.usuario;
    }

    try{
      const u = await this.nativeStorage.getItem('usuario').then(val => {
        if (val) {
          console.log(val);
          // alert(JSON.stringify(val));
          this.defineUsuario(val);
          return this.usuario;
        }

        this.mock();
        return this.usuario;
      });
    } catch (error) {
      this.message += '\n*** Error: ' + JSON.stringify(error);
      this.mock();
    }
    return this.usuario;
  }

  mock(): void {
    this.usuario = new Usuario('1', 'Fulano');
    this.usuario.email = 'fulano@tal.com';
    this.usuario.addNota(1, 'Primeira Nota');
    this.usuario.addNota(2, 'Segunda Nota');
    this.usuario.removerNota(2);
    this.enviarDados();
  }

  enviarDados() {
    // this.http.post(this.url + 'usuario', this.usuario).subscribe(res => {
    //   console.log(res);
    // });
    return this.nativeStorage.setItem('usuario', this.usuario);
  }

  /**
   * Altera dados da nota.
   */
  salvar(nota: Nota): void {
    this.usuario.alterar(nota);
  }

  inserir(titulo, texto, status): Nota {
    const nota = this.usuario.inserirNota(titulo, texto, status);
    this.atualizarMensagem();
    return nota;
  }

  excluir(item): void {
    this.usuario.remover(item);
  }

  recuperar(item): void {
    this.usuario.recuperar(item);
  }

  /**
   * Obtém dados de uma nota pelo seu id.
   * @param id identificador do objeto nota
   */
  getNota(id): Nota {
    for (let index = 0; index < this.usuario.notas.length; index++) {
      const element = this.usuario.notas[index];
      if (element.id === id) {
        return element;
      }
    }
    return null;
  }

  /**
   * Método remove todas as notas do array de notas do usuário que estejam com status = 1.
   */
  limpar(): void {
    for (let index = this.usuario.notas.length - 1; index >= 0; index--) {
      const element = this.usuario.notas[index];
      if (element.status === 1) {
        this.usuario.notas.splice(index, 1);
      }
    }
    this.atualizarMensagem();
  }

  atualizarMensagem(){
    this.message = 'Você tem ' + this.usuario.notas.length + ' notas.';
  }

}
