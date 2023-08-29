import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota, Usuario } from 'src/model/estruturas';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  url = 'http://localhost:3000/';
  usuario: Usuario;

  constructor(private http: HttpClient) {
    this.getUsuario().subscribe(res => {
      this.usuario = new Usuario(res.id, res.nome);
      this.usuario.email = res.email;
      for (let index = 0; index < res.notas.length; index++) {
        const element = res.notas[index];
        const n = this.usuario.inserirNota(element.titulo, element.texto, element.status);
        n.modificacao = element.modificacao;
      }
      this.usuario.ultId = res.ultId;
      // console.log(this.usuario);

    });
  }

  getUsuario(): Observable<Usuario> {
    if (this.usuario) {
      return of(this.usuario);
    }
    return this.http.get<Usuario>(this.url + 'usuario');
  }

  enviarDados(): void {
    this.http.post(this.url + 'usuario', this.usuario).subscribe(res => {
      console.log(res);
    });
  }

  /**
   * Altera dados da nota.
   */
  salvar(nota: Nota): void {
    this.usuario.alterar(nota);
  }

  inserir(titulo, texto, status): Nota {
    return this.usuario.inserirNota(titulo, texto, status);
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
  }

}
