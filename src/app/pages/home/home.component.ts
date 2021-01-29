import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../shared/models/usuario";
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {Empresas} from "../../shared/models/empresas";
import {EmpresasService} from "../../shared/services/empresas.service";

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
  empresas: Empresas[];

  constructor(
    private authService: AuthService,
    private empresasService: EmpresasService,
  ) {
    this.form = new FormGroup({
      cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      placa: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      renavam: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      cnpj: new FormControl('', []),
    });

    if (this.usuario['companies-list?'].length < 1) {
      // this.form.patchValue({});
    }

    if (!environment.production) {
      this.form.patchValue({
        placa: 'JDP0E30',
        renavam: '01315065204',
      });
    }
  }

  ngOnInit(): void {
    this.getEmpresas();
    this.usuario = this.authService.getUser();
  }

  getEmpresas(): void {
    this.empresasService.getEmpresas().subscribe(
      response => {
        this.empresas = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
