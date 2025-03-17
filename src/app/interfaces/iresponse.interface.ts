import { IUsuario } from './iusuario.interface';

export interface IResponse {
    results:IUsuario[];
    page:number;
    per_page:number;
    total:number;
    total_pages:number;
}
