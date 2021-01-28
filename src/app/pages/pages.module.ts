import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import {
  NbButtonModule, NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbUserModule
} from "@nebular/theme";


@NgModule({
  declarations: [HomeComponent, PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    NbMenuModule,
    NbContextMenuModule
  ]
})
export class PagesModule { }
