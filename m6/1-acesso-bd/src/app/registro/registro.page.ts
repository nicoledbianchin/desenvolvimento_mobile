import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nome: string;
  sobrenome: string;
  email: string;
  senha: string;


  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registrar() {
    const usr = new Usuario();
    usr.nome      = this.nome;
    usr.sobrenome = this.sobrenome;
    usr.email     = this.email;
    usr.senha     = this.senha;

    this.authSrv.registrarUsuario(usr).then (res => {
      this.router.navigate(['login']);
    });
  }
}
