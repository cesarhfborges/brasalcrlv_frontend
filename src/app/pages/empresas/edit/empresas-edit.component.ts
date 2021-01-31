import {Component, OnInit} from '@angular/core';
import {NbDateService, NbDialogRef} from "@nebular/theme";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Empresa} from "../../../shared/models/empresa";
import {EmpresasService} from "../../../shared/services/empresas.service";
import {} from 'date-fns';

@Component({
  selector: 'app-empresas-edit',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.scss']
})
export class EmpresasEditComponent implements OnInit {

  minDate: Date = this.dateService.today();

  form: FormGroup;

  empresa: Empresa;

  loading = {
    empresa: false,
    upload: {
      pem: false,
      key: false,
    },
  }

  constructor(
    protected dialogRef: NbDialogRef<any>,
    protected dateService: NbDateService<Date>,
    private empresasService: EmpresasService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      pem: new FormControl(null, []),
      key: new FormControl(null, []),
      certificate_expire: new FormControl(null, []),
      certificate_password: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    if (this.empresa) {
      this.form.patchValue({
        name: this.empresa.name,
        cnpj: this.empresa.cnpj,
        certificate_expire: new Date(Date.parse(this.empresa.certificate_expire))
      });
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading.empresa = true;
      if (this.empresa) {
        this.updateEmpresa();
      } else {
        this.cadastraEmpresa();
      }
    }
  }

  onFileChange(event, input) {
    if (event.target.files.length > 0) {
      this.loading.upload[input] = true;
      const file: File = event.target.files[0];
      this.empresasService.upload(file).subscribe(
        response => {
          this.loading.upload[input] = false;
          this.form.get(input).patchValue(response.url);
        },
        error => {
          console.log(error);
          this.loading.upload[input] = false;
        }
      );
    }
  }

  private updateEmpresa(): void {
    this.empresasService.updateEmpresa({...this.form.value, id: this.empresa.id}).subscribe(
      response => {
        this.dialogRef.close(response);
        this.loading.empresa = false;
      },
      error => {
        console.log(error);
        this.loading.empresa = false;
      }
    );
  }

  private cadastraEmpresa(): void {
    this.empresasService.createEmpresa({...this.form.value}).subscribe(
      response => {
        this.dialogRef.close(response);
        this.loading.empresa = false;
      },
      error => {
        console.log(error);
        this.loading.empresa = false;
      }
    );
  }
}
