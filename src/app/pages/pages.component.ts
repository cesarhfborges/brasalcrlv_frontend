import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {NbDialogService, NbMenuItem, NbMenuService, NbSidebarService, NbToastrService} from "@nebular/theme";
import {LayoutService} from "../shared/services/layout.service";
import {filter} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";
import {Usuario} from "../shared/models/usuario";
import {MENU_ITEMS} from "./pages-menu";
import {UsuariosEditComponent} from "./usuarios/edit/usuarios-edit.component";
import {AlterarSenhaComponent} from "./alterar-senha/alterar-senha.component";

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
      title: 'Alterar Senha',
      icon: 'unlock-outline',
      target: 'password',
    },
    {
      title: 'Sair',
      icon: 'log-in-outline',
      target: 'logout',
    },
  ];

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUser();

    this.menuService.onItemClick().subscribe(( event ) => {
      switch (event.item.target){
        case 'logout':
          this.toastrService.warning('Saindo do sistema.', 'Ok', {
            duration: 3000,
            destroyByClick: true,
            status: "success",
            preventDuplicates: true,
          });
          this.authService.logoutExec().subscribe(
            response => {
              this.sair();
            },
            error => {
              this.sair();
            }
          )
          break;
        case 'password':
          this.changePassword();
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

  private sair(): void {
    this.authService.logout();
  }

  private changePassword(): void {
    this.dialogService.open(AlterarSenhaComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        primeiroAcesso: false,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe((response) => {
        if (response) {
          console.log(response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
