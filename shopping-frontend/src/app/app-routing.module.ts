import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from './core/services/gaurds/auth.gaurd';


const routes: Routes = [
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'register',
//     component: RegisterComponent
//   },
//   {
//     path: 'user',
//     component: UserHomeComponent,
//     canActivate: [AuthGaurd],
//     data: { role: 'USER' }
//   },
//   {
//     path: 'admin',
//     component: AdminHomeComponent,
//     canActivate: [AuthGaurd],
//     data: { role: 'ADMIN' }
//   }
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
