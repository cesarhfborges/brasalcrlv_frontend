import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  submitted = false;

  primeiroAcesso: boolean = false;

  loading = {
    alterar: false
  };

  form: FormGroup;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private authService: AuthService,
    private toastrService: NbToastrService,
  ) {
    this.form = new FormGroup({
      old_password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      logout: new FormControl(false, []),
    }, {
      validators: (abstractControll: AbstractControl) => {
        if (abstractControll.value.password !== abstractControll.value.password_confirmation) {
          return {'passwordMisMatch': true};
        }
        return null;
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading.alterar = true;
      this.authService.changePassword(this.form.value).subscribe(
        response => {
          this.loading.alterar = false;
          console.log(response);

          if (response.status === 205) {
            this.toastrService.success('Senha alterada com sucesso, desconectando da sessão.', 'Ok', {
              duration: 3000,
              destroyByClick: true,
            });
            setTimeout(_ => {
              this.authService.logout()
            }, 1200);
          } else {
            this.toastrService.success('Senha alterada com sucesso.', 'Ok', {
              duration: 3000,
              destroyByClick: true,
            });
            this.dialogRef.close(response);
          }
        },
        error => {
          console.log(error);
          this.loading.alterar = false;
          const lg = this.form.get('logout').value;
          this.form.reset();
          this.form.get('logout').patchValue(lg);
          this.submitted = false;
          this.toastrService.warning(error.message, 'Ops', {
            duration: 3000,
            destroyByClick: true,
          })
        }
      );
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

  close(): void {
    this.dialogRef.close(null);
  }
}
