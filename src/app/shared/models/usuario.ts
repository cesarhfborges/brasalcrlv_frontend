export interface Usuario {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  cpf: string;
  "companies-list?": Array<number>;
}
