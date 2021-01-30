export interface Usuario {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  cpf: string;
  password?: string;
  permission: 'admin' | 'user';
  password_confirmation?: string;
  companies_list?: Array<number>;
}
