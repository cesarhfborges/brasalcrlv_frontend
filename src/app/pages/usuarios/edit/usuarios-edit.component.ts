import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../shared/models/usuario";
import {NbDialogRef} from "@nebular/theme";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {

  usuario: Usuario;

  form: FormGroup;

  constructor(
    protected dialogRef: NbDialogRef<any>,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, []),
      email: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.form.patchValue(this.usuario)
    }
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {

  }
}
