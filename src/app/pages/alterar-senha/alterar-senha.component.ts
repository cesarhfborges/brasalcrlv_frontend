import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {NbDialogRef} from "@nebular/theme";

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
  ) {
    this.form = new FormGroup({
      old_password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(4)]),
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
      console.log(this.form.value);
      this.loading.alterar = true;
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
