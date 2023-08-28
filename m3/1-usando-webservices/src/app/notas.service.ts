import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/model/estruturas';
import { catchError, map, tap } from 'rxjs/operators';
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

    });
  }

  mock(): void {
    this.usuario = new Usuario('1', 'Fulano');
    this.usuario.email = 'fulano@tal.com';
    this.usuario.addNota(1, 'Primeira Nota');
    this.usuario.addNota(2, 'Segunda Nota');
    this.usuario.removerNota(2);
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

  salvar(titulo, texto, status): void {
    this.usuario.inserirNota(titulo, texto, status);
  }

  excluir(item): void {
    this.usuario.remover(item);
  }

  recuperar(item): void {
    this.usuario.recuperar(item);
  }

}
