import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Empresas} from "../models/empresas";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(
    private http: HttpClient
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

  uploadCertificate(form: any): void {
    this.http.post(`${environment.apiUrl}/certificate`, form, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      // uploadProgress(progress => (this.percentDone = progress)),
      // toResponseBody()
    );
    //   .subscribe(response => {
    //   // this.progress = 0;
    //   // this.signup.reset();
    //   // do something with the response
    // });
  }
}
