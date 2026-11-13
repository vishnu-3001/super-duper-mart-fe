
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGaurd } from './core/gaurds/auth.gaurd';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    canActivate: [AuthGaurd],
    data: { role: 'USER' },
    loadChildren: () =>
      import('./features/user/user.module')
        .then(m => m.UserModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGaurd],
    data: { role: 'ADMIN' },
    loadChildren: () =>
      import('./features/admin/admin.module')
        .then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
