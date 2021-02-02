import {Component, OnInit} from '@angular/core';
import {Empresa} from "../../../shared/models/empresa";
import {EmpresasService} from "../../../shared/services/empresas.service";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {EmpresasEditComponent} from "../edit/empresas-edit.component";
import {ConfirmationService} from "primeng/api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss']
})
export class EmpresasListComponent implements OnInit {

  loading = {
    empresas: true
  };

  empresas: Empresa[];

  cols: Array<{ field: string; header: string; type: string; }> = [
    {field: 'name', header: 'Nome', type: 'string'},
    {field: 'cnpj', header: 'CNPJ', type: 'mask'},
    {field: 'certificate_expire', header: 'Expira', type: 'date'},
  ];

  constructor(
    private empresasService: EmpresasService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private modalService: NgbModal,
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
      },
      error => {
        this.loading.empresas = false;
        console.log(error);
      }
    );
  }

  editarEmpresa(empresa: Empresa) {
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
        this.loading.empresas = true;
        this.empresasService.deleteEmpresa(id).subscribe(
          response => {
            const i = this.empresas.findIndex(u => u.id == id);
            this.empresas.splice(i,1);
            this.loading.empresas = false;
            this.toastrService.success('Empresa removida com sucesso.', 'Ok', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          },
          error => {
            console.log(error);
            this.loading.empresas = false;
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  size: 'xl', scrollable: true});
  }

  cadastraEmpresa() {
    this.dialogService.open(EmpresasEditComponent, {
      autoFocus: true,
      closeOnBackdropClick: false,
      hasBackdrop: true,
      hasScroll: true,
      dialogClass: 'model-full'
    }).onClose.subscribe((response) => {
        if (response) {
          this.empresas.push(response);
          this.toastrService.success('Empresa cadastrada com sucesso', 'Ok', {
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
}
