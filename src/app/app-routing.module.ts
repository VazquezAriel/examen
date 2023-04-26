import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "usuarios",
    component: UsersComponent,
  },
  
  {
    path: "login",
    component: LoginComponent,
  },

  {
    // Cuando se introduce un ruta no existente
    path: '**',
    redirectTo: 'login',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
