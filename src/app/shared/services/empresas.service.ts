import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpXhrBackend} from "@angular/common/http";
import {Observable} from "rxjs";
import {Empresa} from "../models/empresa";
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

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${environment.apiUrl}/companies`);
  }

  updateEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${environment.apiUrl}/companies/${empresa.id}`, empresa);
  }

  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${environment.apiUrl}/companies`, empresa);
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
