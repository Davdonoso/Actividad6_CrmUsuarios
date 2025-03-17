import { Component, Input ,inject , EventEmitter, Output} from '@angular/core';
import { ButtonsComponent } from '../../../shared/buttons/buttons.component';
import { IUsuario } from '../../../interfaces/iusuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-view',
  imports: [ButtonsComponent],
  templateUrl: './usuarios-view.component.html',
  styleUrl: './usuarios-view.component.css'
})
export class UsuariosViewComponent {
  @Input() idUsuario:string = "";
  usuario:IUsuario | any;
  usuarioService = inject(UsuarioService);
  @Output() deleteUserEmit: EventEmitter<IUsuario> = new EventEmitter();
  router = inject(Router);
  
  async ngOnInit() {
    try {
      this.usuario = await this.usuarioService.getById(this.idUsuario);
      console.log('usuario recuperado:', this.usuario);
    }catch(msg: any) {
      toast.error(msg.error || 'No se ha podido recuperar el usuario')
  
    }
    }
    deleteUsuario(event: IUsuario) {
      console.log('usuario eliminado:', this.usuario);
      this.deleteUserEmit.emit(this.usuario._id);
      setTimeout(() => {
        this.router.navigate(['/dashboard', 'usuarios']);
      }, 3000); 
      toast.success('Usuario eliminado con éxito', {
        duration: 3000});
      
    }
   
    
  }
  

