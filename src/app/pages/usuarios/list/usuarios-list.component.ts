import { Component, OnInit } from '@angular/core';
import {UsuariosService} from "../../../shared/services/usuarios.service";
import {Usuario} from "../../../shared/models/usuario";

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent implements OnInit {

  usuarios: Usuario[];

  cols: Array<{field: string; header: string; }> = [
    { field: 'name', header: 'Nome' },
    { field: 'lastname', header: 'Sobrenome' },
  ];
  loading = false;

  constructor(
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.loading = true;
    this.usuariosService.getUsuarios().subscribe(
      response => {
        this.loading = false;
        this.usuarios = response;
      },
      error => {
        this.loading = false;
      }
    );
  }
}
