import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UsuariosListComponent} from "./usuarios/list/usuarios-list.component";
import {EmpresasListComponent} from "./empresas/list/empresas-list.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosListComponent,
  },
  {
    path: 'empresas',
    component: EmpresasListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
