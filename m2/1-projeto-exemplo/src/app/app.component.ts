import { Component } from '@angular/core';

@Component({ // define como componente
  selector: 'app-root', // tag HTML para representar 
  templateUrl: './app.component.html', // arquivo template 
  styleUrls: ['./app.component.css'] // arquivo de estilos
})
export class AppComponent {
  title = '1-projeto-exemplo';
}
