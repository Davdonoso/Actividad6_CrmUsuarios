import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario.interface';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private endPoint: string = "https://peticiones.online/api/users";
  httpClient = inject(HttpClient);
  private currentPage: number = 1;
  private perPage: number = 10;
  private totalPages: number = 2;

  getAll(): Promise<IUsuario[]> {
    return lastValueFrom(this.httpClient.get<IUsuario[]>(this.endPoint));
  }

  getById(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.endPoint}/${id}`));
  }
  delete(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.endPoint}/${id}`));
  }
  async gotoNext(): Promise<IResponse | null> {
    if (this.currentPage < this.totalPages) {
      const nextPage = this.currentPage + 1;
      try {
        const response = await this.cargarUsuarios(nextPage);
        if (response) {
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
          return response;
        }
      } catch (error) {
        console.error("Error al cargar la siguiente página", error);
      }
    }
    return null;
  }

  async gotoPrev(): Promise<IResponse | null> {
    if (this.currentPage > 1) {
      const prevPage = this.currentPage - 1;
      try {
        const response = await this.cargarUsuarios(prevPage);
        if (response) {
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
          return response;
        }
      } catch (error) {
        console.error("Error al cargar la página anterior", error);
      }
    }
    return null;
  }
  async cargarUsuarios(page: number): Promise<IResponse> {
    const url = `https://peticiones.online/api/users?page=${page}&limit=${this.perPage}`;
    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }
  update(usuario: IUsuario): Promise<IUsuario> {
    let {_id,...usuarioBody} = usuario;
    return lastValueFrom(this.httpClient.put<IUsuario>(`${this.endPoint}/${usuario._id}`, usuarioBody));
  }
  insert(usuario:IUsuario): Promise<IUsuario> {
    let {_id,...usuarioBody} = usuario;
    return lastValueFrom(this.httpClient.post<IUsuario>(this.endPoint,usuarioBody));

  }
}
