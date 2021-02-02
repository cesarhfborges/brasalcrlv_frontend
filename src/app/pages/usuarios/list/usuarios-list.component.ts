import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "../../../shared/services/usuarios.service";
import {Usuario} from "../../../shared/models/usuario";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {UsuariosEditComponent} from "../edit/usuarios-edit.component";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[];

  cols: Array<{ field: string; header: string; }> = [
    {field: 'name', header: 'Nome'},
    {field: 'email', header: 'E-Mail'},
  ];
  loading = false;

  constructor(
    private usuariosService: UsuariosService,
    private dialogService: NbDialogService,
    private confirmationService: ConfirmationService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.loading = true;
    this.usuariosService.getUsuarios().subscribe(
      response => {
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
          const i = this.usuarios.findIndex(i => i.id === response.id);
          this.usuarios[i] = response;
          this.toastrService.success('Dados atualizados com sucesso', 'Ok', {
            duration: 3000,
            destroyByClick: true,
            status: "success",
            preventDuplicates: true,
          })
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  cadastraUsuario(): void {
    this.dialogService.open(UsuariosEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      dialogClass: 'model-full'
    }).onClose.subscribe((response) => {
        if (response) {
          this.usuarios.push(response);
          this.toastrService.success('Usuario cadastrado com sucesso', 'Ok', {
            duration: 3000,
            destroyByClick: true,
            status: "success",
            preventDuplicates: true,
          })
        }
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
      acceptButtonStyleClass: 'btn-warning',
      rejectLabel: "Não",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.loading = true;
        this.usuariosService.deleteUsuario(id).subscribe(
          response => {
            const i = this.usuarios.findIndex(u => u.id == id);
            this.usuarios.splice(i,1);
            this.loading = false;
            this.toastrService.success('Usuario removido com sucesso.', 'Ok', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          },
          error => {
            console.log(error);
            this.loading = false;
            this.toastrService.danger('Parece que alguma coisa nao foi bem, tente novamente mais tarde.', 'Ops', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          }
        );
      }
    });
  }
}
