import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosListComponent } from './pages/dashboard/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './pages/dashboard/usuarios-form/usuarios-form.component';
import { UsuariosViewComponent } from './pages/dashboard/usuarios-view/usuarios-view.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
    { path:"", pathMatch:"full", redirectTo:"home"},
    { path: "home", component:HomeComponent},
    { path: "dashboard", component:DashboardComponent, children:
        [
            { path:"", pathMatch: "full", redirectTo:"usuarios"},
            { path:"usuarios", component:UsuariosListComponent},
            { path:"usuarios/new", component:UsuariosFormComponent},
            { path:"usuarios/:idUsuario", component:UsuariosViewComponent},
            { path:"usuarios/update/:idUsuario", component:UsuariosFormComponent}
        ]
    },
    { path: "**", component:Error404Component}
];
