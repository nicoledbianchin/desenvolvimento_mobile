import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Nota } from 'src/model/estruturas';
import { NotasService } from '../notas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @Input() nota: Nota;

  constructor(private platform: Platform, private serv: NotasService, private router: Router, private route: ActivatedRoute) {
    // this.platform.ready().then(() => {
      const id = this.route.snapshot.paramMap.get('id');
      console.log('*** ID: ' + id);
      this.nota = this.serv.getNota(parseInt(id, 10));
      console.log('*** nota', this.nota);
      if (!this.nota) {
        this.nova();
      }
    // });
  }

  salvar(): void {
    if (this.nota.id) {
      this.serv.salvar(this.nota);
    } else {
      this.serv.inserir(this.nota.titulo, this.nota.texto, this.nota.status);
    }
    this.router.navigate(['/tabs/tab1']);
  }

  nova(): void {
    this.nota = new Nota(null, '');
  }

}
