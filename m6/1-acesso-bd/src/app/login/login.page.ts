import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    try {
      // const t = this;
      this.authSrv.login(this.email, this.senha, this.router,
        function(user, nav) {
          console.log('Entrou como ' + user.nome);
          nav.navigate(['mapa']);
        });
    } catch (e) {
      console.log('ERRO LOGIN COMP = ' + JSON.stringify(e));
    }
  }


}
