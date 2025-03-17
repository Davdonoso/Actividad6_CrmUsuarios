import { Component ,Input,inject,Output, EventEmitter} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEdit, faTrash,faUndo } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faUndo= faUndo;
  @Input() myUsuario!:IUsuario
  @Input() usuario!:IUsuario
  usuarioService = inject(UsuarioService)
  @Output() deleteUserEmit:EventEmitter<IUsuario> = new EventEmitter()
  router = inject(Router)
  @Input() Volver: Boolean = false;

   async delete(_id: string) {
    toast(`¿Deseas Borrar al Usuario ${this.myUsuario.first_name} ${this.myUsuario.last_name}`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          const usuarioEliminado = await this.usuarioService.delete(_id);
          console.log('Usuario eliminado:', usuarioEliminado);
          
           if (this.deleteUserEmit.observed) {
              this.deleteUserEmit.emit(this.usuario);
              
            } else {
              this.router.navigate(['/dashboard', 'usuarios']);
              toast.success('Usuario eliminado con éxito');
            }
          }
        }
    
      })
      }
      
  }

