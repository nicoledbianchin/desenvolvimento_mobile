import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario, UserResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usrListRef = this.db.list<Usuario>('usuarios-list');
  usuario: Usuario;

  constructor(private fbAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
  }

  async registrarUsuario(usuario: Usuario) {
    this.registrar(usuario).then(ref => {
      console.log('*** registrado ' + ref.result.user.uid);
      // associando dados com usuário do FB
      this.usuario = new Usuario();
      this.usuario.uid = ref.result.user.uid;
      this.usuario.nome = usuario.nome;
      this.usuario.email = usuario.email;
      this.usuario.sobrenome = usuario.sobrenome;
    //   this.usuario.locations = [];
      this.saveUsuarioData(this.usuario).then(_ => {
        console.log(_.key + ' gravado');
        this.usuario.did = _.key;
        this.usrListRef.update(_.key, this.usuario);
      });
    });
  }

  // registrando usuário no FB
  private async registrar(usuario: Usuario) {
    try {
      return  {
        result: await this.fbAuth.createUserWithEmailAndPassword(
          usuario.email, usuario.senha)
      } as UserResponse;
    } catch (e) {
      console.log(e);
      return  {
        error: e
      } as UserResponse;
    }
  }

  private saveUsuarioData(usuario: Usuario) {
    return this.usrListRef.push(usuario);
  }

  login(email: string, senha: string, nav?, callback?) {
    this.execLogin(email, senha).then(ref => {
      if (ref.error) {
        throw new Error("Usuário inválido");
      } else {
        return this.usrListRef.valueChanges().subscribe(lst => {
          const usuario = lst.filter(value => {
            if (ref.result.user) {
              return value.uid === ref.result.user.uid;
            }
            return value.uid === ref.result.uid;
          })[0];
          this.usuario = usuario;
          if (callback) {
            callback(this.usuario, nav); // função a ser chamada após o login do usuário
          }
        });
      }
    });
  }

  private async execLogin(email: string, senha: string) {
    try {
      return  {
        result: await this.fbAuth.signInWithEmailAndPassword(
          email, senha
        )
      } as UserResponse;
    } catch (e) {
      console.log(JSON.stringify(e));
      return  {
        error: e
      } as UserResponse;
    }
  }
}
