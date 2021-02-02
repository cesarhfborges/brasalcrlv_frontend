import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import {
    NbButtonModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbContextMenuModule, NbDatepickerModule,
    NbIconModule, NbInputModule,
    NbLayoutModule,
    NbMenuModule, NbSelectModule,
    NbSidebarModule, NbSpinnerModule,
    NbUserModule
} from "@nebular/theme";
import { UsuariosListComponent } from './usuarios/list/usuarios-list.component';
import { UsuariosEditComponent } from './usuarios/edit/usuarios-edit.component';
import {TableModule} from "primeng/table";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxMaskModule} from "ngx-mask";
import { EmpresasEditComponent } from './empresas/edit/empresas-edit.component';
import { EmpresasListComponent } from './empresas/list/empresas-list.component';
import {CalendarModule} from "primeng/calendar";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';


@NgModule({
  declarations: [HomeComponent, PagesComponent, UsuariosListComponent, UsuariosEditComponent, EmpresasEditComponent, EmpresasListComponent, AlterarSenhaComponent],
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
        TableModule,
        ReactiveFormsModule,
        NbInputModule,
        ConfirmDialogModule,
        NgSelectModule,
        NbSpinnerModule,
        NgxMaskModule,
        CalendarModule,
        NbCalendarModule,
        NbDatepickerModule,
        NbDateFnsDateModule,
        NbSelectModule,
        NbCheckboxModule,
    ]
})
export class PagesModule { }
