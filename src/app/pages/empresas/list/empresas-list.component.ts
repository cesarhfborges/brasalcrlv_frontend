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

  }

  cadastraEmpresa() {

  }
}
