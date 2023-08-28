import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/model/estruturas';

@Component({
  selector: 'app-detalhe-nota',
  templateUrl: './detalhe-nota.component.html',
  styleUrls: ['./detalhe-nota.component.css']
})
export class DetalheNotaComponent implements OnInit {

  @Input() nota: Nota;

  constructor() {
  }

  ngOnInit(): void {
  }

}
