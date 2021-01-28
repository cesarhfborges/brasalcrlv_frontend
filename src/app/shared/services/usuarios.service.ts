import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/users`);
  }
}
