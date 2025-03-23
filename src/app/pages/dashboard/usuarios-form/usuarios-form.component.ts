import { Component, Input , inject} from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup, Validators} from '@angular/forms';
import { IUsuario } from '../../../interfaces/iusuario.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios-form',
  imports: [ReactiveFormsModule],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.css'
})
export class UsuariosFormComponent {
  @Input() idUsuario: string = "";
  userForm: FormGroup = new FormGroup({},[]);
  usuario!: IUsuario;
  usuarioService = inject(UsuarioService);
  title: string = "Registrar";
  router = inject(Router);
  
  location = inject(Location);

  async ngOnInit() {
    if (this.idUsuario) {
      try {
        this.usuario = await this.usuarioService.getById(this.idUsuario);
        this.title = 'Actualizar';
      } catch (msg: any) {
        toast.error(msg.error);
      }
    }
    this.userForm = new FormGroup({
      _id: new FormControl(this.idUsuario || null, []),
      nombre: new FormControl(this.usuario?.first_name || "", Validators.required),
      apellidos: new FormControl(this.usuario?.last_name || "", Validators.required),
      username: new FormControl(this.usuario?.username || "", Validators.required),
      password: new FormControl(this.usuario?.password || "", [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.usuario?.email || "", [Validators.required, Validators.email]),
      avatar: new FormControl(this.usuario?.image || "", [Validators.required, Validators.pattern('https?://.+')]),
    });
    
  }

  async getDataForm() {
    let response: IUsuario | any;
     if (this.userForm.value._id) {
        try {
        response = await this.usuarioService.update(this.userForm.value);
        toast.success("Usuario actualizado correctamente");
        setTimeout(() => {
          this.router.navigate(['/dashboard', 'usuarios']);
        }, 3000); 
        
        }catch (msg: any) {
          toast.error("El usuario que intentas editar no existe");
        }
        
      } else {
        response = await this.usuarioService.insert(this.userForm.value);
        toast.success("Usuario registrado correctamente");
        setTimeout(() => {
          this.router.navigate(['/dashboard', 'usuarios']);
        }, 3000); 
      }
    } 
    cancel() {
       this.location.back();
      
    }
  
 }


