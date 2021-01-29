export interface Usuario {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  cpf: string;
  password?: string;
  password_confirmation?: string;
  "companies-list?": Array<number>;
}
