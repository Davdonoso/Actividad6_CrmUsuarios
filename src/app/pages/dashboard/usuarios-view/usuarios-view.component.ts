import { Component, Input ,inject } from '@angular/core';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { IUsuario } from '../../../interfaces/iusuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios-view',
  imports: [ButtonsComponent],
  templateUrl: './usuarios-view.component.html',
  styleUrl: './usuarios-view.component.css'
})
export class UsuariosViewComponent {
  @Input() idUsuario: string = "";
  usuario: IUsuario | any;
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  location = inject(Location);
  
  async ngOnInit() {
    try {
      this.usuario = await this.usuarioService.getById(this.idUsuario);
    } catch (msg: any) {
      toast.error(msg.error || 'No se ha podido recuperar el usuario');
    }
  }

  async eliminarUsuario() {
    try {
      await this.usuarioService.delete(this.idUsuario);
      this.location.back();
    } catch (msg: any) {
      toast.error(msg.error || 'No se ha podido eliminar el usuario');
    }
  }
}


