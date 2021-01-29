import {Component, OnInit} from '@angular/core';
import {NbDateService, NbDialogRef} from "@nebular/theme";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Empresas} from "../../../shared/models/empresas";
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

  empresa: Empresas;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    protected dateService: NbDateService<Date>,
    private empresasService: EmpresasService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      certificate: new FormControl(null, []),
      certificate_expire: new FormControl(null, []),
      certificate_password: new FormControl(null, []),
      fileSource: new FormControl(null, [])
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
      if (this.empresa) {
        this.updateEmpresa();
      } else {
        this.cadastraEmpresa();
      }
    }
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(event.target.files);
      this.form.patchValue({
        fileSource: file
      });
    }
  }

  private updateEmpresa(): void {
    this.empresasService.updateEmpresa({...this.form.value, id: this.empresa.id}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  private cadastraEmpresa(): void {
    this.empresasService.createEmpresa({...this.form.value}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
