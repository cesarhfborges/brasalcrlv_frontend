import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {NbMenuItem, NbMenuService, NbSidebarService} from "@nebular/theme";
import {LayoutService} from "../shared/services/layout.service";
import {filter} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";
import {Usuario} from "../shared/models/usuario";
import {MENU_ITEMS} from "./pages-menu";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  usuario: Usuario;

  env = environment;

  menu: NbMenuItem[] = MENU_ITEMS;

  year: Date = new Date();

  items: NbMenuItem[] = [
    {
      title: 'Sair',
      icon: 'unlock-outline',
      target: 'logout',
    },
  ];

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUser();

    this.menuService.onItemClick().subscribe(( event ) => {
      switch (event.item.target){
        case 'logout':
          this.authService.logout();
          break;
      }
    });
    this.menu = MENU_ITEMS.filter(i => {
      const p: Array<any> = i.data as Array<any>;
      return p.includes(this.usuario.permission);
    });
  }


  toggleSidebar(): void {
    this.sidebarService.toggle(true, 'menu-sidebar');
  }
}
