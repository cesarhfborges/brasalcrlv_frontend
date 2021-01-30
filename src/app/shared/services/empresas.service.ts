import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpXhrBackend} from "@angular/common/http";
import {Observable} from "rxjs";
import {Empresas} from "../models/empresas";
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  getEmpresas(): Observable<Empresas[]> {
    return this.http.get<Empresas[]>(`${environment.apiUrl}/companies`);
  }

  updateEmpresa(empresa: Empresas): Observable<Empresas> {
    return this.http.put<Empresas>(`${environment.apiUrl}/companies/${empresa.id}`, empresa);
  }

  createEmpresa(empresa: Empresas): Observable<Empresas> {
    return this.http.post<Empresas>(`${environment.apiUrl}/companies`, empresa);
  }

  deleteEmpresa(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/companies/${id}`);
  }

  upload(fileToUpload: File): Observable<any>{
    const httpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));
    const formData: FormData = new FormData();
    formData.append('arquivo', fileToUpload, fileToUpload.name);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return httpClient.post<any>(`${environment.apiUrl}/upload`, formData, {headers: headers});
  }
}
