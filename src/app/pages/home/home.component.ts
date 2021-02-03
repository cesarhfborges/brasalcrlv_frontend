import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../shared/models/usuario";
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {Empresa} from "../../shared/models/empresa";
import {EmpresasService} from "../../shared/services/empresas.service";
import {CrlvService} from "../../shared/services/crlv.service";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  loading = {
    crlv: false,
    empresas: false,
  }

  usuario: Usuario;
  empresas: Empresa[];

  constructor(
    private authService: AuthService,
    private empresasService: EmpresasService,
    private crlvService: CrlvService,
    private toastrService: NbToastrService,
  ) {
    this.form = new FormGroup({
      placa: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      renavam: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      company: new FormControl('', [Validators.required]),
      filial: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    this.getEmpresas();
    this.usuario = this.authService.getUser();

    if (this.usuario.companies_list) {
      this.form.patchValue({company: this.usuario.companies_list[0]});
    }

    if (!environment.production) {
      this.form.patchValue({
        placa: 'JDP0E30',
        renavam: '01315065204',
      });
    }
  }

  getEmpresas(): void {
    this.empresasService.getEmpresas().subscribe(
      response => {
        this.empresas = response.filter(e => this.usuario.companies_list.includes(e.id));
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loading.crlv = true;
      this.crlvService.generateCrlv(this.form.value).subscribe(
        response => {
          if (response.base64) {
            this.showPdf({...this.form.value, pdf: response.base64});
          } else {
            this.toastrService.warning('Nao foi encontrado crlv para este veiculo tente novamente mais tarde ou verifique os campos.', 'Ops', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          }
          this.loading.crlv = false;
        },
        error => {
          console.log(error);
          this.loading.crlv = false;
          if (error.status === 404) {
            this.toastrService.warning('Nao foi encontrado crlv para este veiculo tente novamente mais tarde ou verifique os campos.', 'Ops', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          } else {
            this.toastrService.danger('Erro ao comunincar com os servidores serpro.', 'Ops', {
              duration: 3000,
              destroyByClick: true,
              preventDuplicates: true,
            })
          }
        }
      );
    }
  }

  private showPdf(options: { placa: string, renavam: string, pdf: string }): void {
    // height=${window.screen.availHeight - 100},
    //   width=${window.screen.availWidth - 150},
    const features = `
    top=0,
    left=0,
    width=${screen.width - 100},
    height=${screen.height - 100},
    fullscreen=yes,
    toolbar=no,
    titlebar=no,
    location=no,
    status=no,
    menubar=no,
    position=center,
    directories=no,
    copyhistory=no`;
    const pdfWindow = window.open('_blank', 'MsgWindow', features);
    setTimeout(_ => {
      pdfWindow.document.write(`<iframe style="height: 100%; width: 100%; outline: none; border: none;" src='data:application/pdf;base64,${options.pdf}'></iframe>`);
      pdfWindow.document.head.title = `clrv_${options.placa}_${options.renavam}`;
      pdfWindow.document.body.style.padding = '0';
      pdfWindow.document.body.style.margin = '0';
    }, 60);
  }
}
