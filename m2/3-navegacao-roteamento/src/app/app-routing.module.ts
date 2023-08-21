import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  { path: '', redirectTo: '/sobre', pathMatch: 'full' },
  // { path: 'home', component: AppComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'ajuda', component: AjudaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
