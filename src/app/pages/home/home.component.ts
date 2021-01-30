import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../shared/models/usuario";
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {Empresas} from "../../shared/models/empresas";
import {EmpresasService} from "../../shared/services/empresas.service";
import {CrlvService} from "../../shared/services/crlv.service";

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
    private crlvService: CrlvService,
  ) {
    this.form = new FormGroup({
      placa: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      renavam: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      company: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getEmpresas();
    this.usuario = this.authService.getUser();

    if (this.usuario.companies_list) { // && this.usuario.companies_list.length < 2
      this.form.patchValue({company: this.usuario.companies_list.shift()});
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
        this.empresas = response;
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
          console.log(response);
          this.loading.crlv = false;
        },
        error => {
          console.log(error);
          this.loading.crlv = false;
        }
      );
    }
  }
}
