import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotasService } from '../notas.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo: string;
  texto: string;
  status: number;

  situacoes = [
    { desc: 'Ativa', val: 0},
    { desc: 'Inativa', val: 1}
  ];

  constructor(private serv: NotasService, private router: Router) {
  }

  ngOnInit(): void {
  }

  reset(): void {
    this.titulo = '';
    this.texto = '';
    this.status = null;
  }

  salvar(): void {
    this.serv.salvar(this.titulo, this.texto, parseInt('' + this.status, 10));
    this.reset();
    this.router.navigate(['home']);
  }


}
