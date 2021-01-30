import {Component, OnInit} from '@angular/core';
import {Empresas} from "../../../shared/models/empresas";
import {EmpresasService} from "../../../shared/services/empresas.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {EmpresasEditComponent} from "../edit/empresas-edit.component";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss']
})
export class EmpresasListComponent implements OnInit {

  loading = {
    empresas: true
  };

  empresas: Empresas[];

  cols: Array<{ field: string; header: string; type: string; }> = [
    {field: 'name', header: 'Nome', type: 'string'},
    {field: 'cnpj', header: 'CNPJ', type: 'mask'},
    {field: 'certificate_expire', header: 'Expira', type: 'date'},
  ];

  constructor(
    private empresasService: EmpresasService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private confirmationService: ConfirmationService,
  ) {
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(): void {
    this.loading.empresas = true;
    this.empresasService.getEmpresas().subscribe(
      response => {
        this.empresas = response;
        this.loading.empresas = false;
        console.log(response)
      },
      error => {
        this.loading.empresas = false;
        console.log(error);
      }
    );
  }

  editarEmpresa(empresa: Empresas) {
    this.dialogService.open(EmpresasEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        empresa: empresa,
      },
      dialogClass: 'model-full'
    }).onClose.subscribe((response) => {
        if (response) {
          const i = this.empresas.findIndex(i => i.id === response.id);
          this.empresas[i] = response;
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

  deleteEmpresa(id) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja realizar esta ação?',
      header: "Atenção",
      acceptLabel: "Sim",
      acceptButtonStyleClass: 'btn-warning',
      rejectLabel: "Não",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.empresasService.deleteEmpresa(id).subscribe(
          response => {
            const i = this.empresas.findIndex(u => u.id == id);
            this.empresas.splice(i,1);
            this.toastrService.success('Usuario removido com sucesso.', 'Ok', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          },
          error => {
            console.log(error);
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

  cadastraEmpresa() {

  }
}
