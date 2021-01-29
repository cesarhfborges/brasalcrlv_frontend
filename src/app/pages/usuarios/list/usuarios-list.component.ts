import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../../../shared/services/usuarios.service";
import {Usuario} from "../../../shared/models/usuario";
import {NbDialogService} from "@nebular/theme";
import {UsuariosEditComponent} from "../edit/usuarios-edit.component";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[];

  cols: Array<{field: string; header: string; }> = [
    { field: 'name', header: 'Nome' },
    { field: 'lastname', header: 'Sobrenome' },
  ];
  loading = false;

  constructor(
    private usuariosService: UsuariosService,
    private dialogService: NbDialogService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.loading = true;
    this.usuariosService.getUsuarios().subscribe(
      response => {
        console.log(response);
        this.loading = false;
        this.usuarios = response;
      },
      error => {
        this.loading = false;
      }
    );
  }

  editarUsuario(usuario: Usuario): void {
    this.dialogService.open(UsuariosEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        usuario: usuario,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe((response) => {
      if (response) {
        console.log(response);
      }
        // if (response) {
        //   const p = this.postos.find(ps => ps.id = response.id);
        //   p.name = response.name;
        //   p.cnpj = response.cnpj;
        //   p.itau_client_id = response.itau_client_id;
        //   this.toastService.showToastSuccess('Filial atualizada.', 'Sucesso');
        // }
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteUSuario(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja realizar esta ação?',
      header: "Atenção",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.usuariosService.deleteUsuario(id).subscribe(
          response => {

          },
          error => {

          }
        );
      }
    });
  }
}
