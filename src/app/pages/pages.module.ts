import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import {
  NbButtonModule, NbCardModule, NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbUserModule
} from "@nebular/theme";
import { UsuariosListComponent } from './usuarios/list/usuarios-list.component';
import { UsuariosEditComponent } from './usuarios/edit/usuarios-edit.component';
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [HomeComponent, PagesComponent, UsuariosListComponent, UsuariosEditComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    NbMenuModule,
    NbContextMenuModule,
    NbCardModule,
    TableModule
  ]
})
export class PagesModule { }
