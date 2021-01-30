import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../shared/models/usuario";
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmpresasService} from "../../../shared/services/empresas.service";
import {UsuariosService} from "../../../shared/services/usuarios.service";

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {

  loading = {
    empresas: false,
    usuarios: false,
  }

  empresas: any;

  usuario: Usuario;

  form: FormGroup;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private empresasService: EmpresasService,
    private usuariosService: UsuariosService,
    private toastrService: NbToastrService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, []),
      email: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
      password: new FormControl(null, []),
      password_confirmation: new FormControl(null, []),
      permission: new FormControl(null, [Validators.required]),
      companies_list: new FormControl(null, [Validators.required]),
    }, {
      validators: (abstractControll: AbstractControl) => {
        if (abstractControll.value.password !== abstractControll.value.password_confirmation) {
          return {error: 'requiredPassword'};
        }
        return null;
      }
    });
  }

  ngOnInit(): void {
    this.getEmpresas();
    if (this.usuario) {
      this.form.patchValue(this.usuario)
    }
  }

  getEmpresas(): void {
    this.loading.empresas = true;
    this.empresasService.getEmpresas().subscribe(
      response => {
        console.log(response);
        this.empresas = response;
        this.loading.empresas = false;
      },
      error => {
        console.log(error);
        this.loading.empresas = false;
      }
    );
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
      this.loading.usuarios = true;
      if (this.usuario) {
        this.updateUsuario();
      } else {
        this.createUsuario();
      }
    } else {
      const invalid = [];
      const controls = this.form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      console.log(invalid)
    }
  }

  private createUsuario(): void {
    this.usuariosService.createUsuario(this.form.value).subscribe(
      response => {
        this.loading.usuarios = false;
        this.dialogRef.close(response);
      },
      e => {
        this.loading.usuarios = false;
        this.toastrService.danger('Verifique os campos', 'Ops', {
          duration: 3000,
          destroyByClick: true,
          preventDuplicates: true,
        })
      }
    )
  }

  private updateUsuario(): void {
    this.usuariosService.updateUsuario({...this.form.value, id: this.usuario.id}).subscribe(
      response => {
        this.loading.usuarios = false;
        this.dialogRef.close(response);
      },
      e => {
        this.loading.usuarios = false;
        this.toastrService.danger('Verifique os campos', 'Ops', {
          duration: 3000,
          destroyByClick: true,
          preventDuplicates: true,
        })
      }
    )
  }
}
