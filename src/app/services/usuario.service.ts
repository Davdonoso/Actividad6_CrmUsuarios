import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private endPoint: string = "https://peticiones.online/api/users";
  httpClient = inject(HttpClient);


  getAll(): Promise<IUsuario[]> {
    return lastValueFrom(this.httpClient.get<IUsuario[]>(this.endPoint));
  }

  getById(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.endPoint}/${id}`));
  }
}
