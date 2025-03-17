import { Component , inject} from '@angular/core';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { IUsuario } from '../../../interfaces/iusuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-usuarios-list',
  imports: [ButtonsComponent],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent {
  arrUsuarios: IUsuario[] = [];
  usuarioService = inject(UsuarioService);
  currentPage: number = 1;
  totalPages: number = 1;

  async ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios(page: number = 1) {
    try {
      const response = await this.usuarioService.cargarUsuarios(page);
      if (response) {
        this.arrUsuarios = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
      }
    } catch (msg: any) {
      toast.error(msg.error || 'Error al cargar usuarios');
    }
  }

  async gotoNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.cargarUsuarios(this.currentPage);
    }
  }

  async gotoPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.cargarUsuarios(this.currentPage);
    }
  }

deleteUsuario(id: string) {
  this.arrUsuarios = this.arrUsuarios.filter(usuario => usuario._id !== id);
  toast.success('Usuario eliminado con éxito');
}
}

