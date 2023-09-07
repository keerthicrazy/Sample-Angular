import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [ 
  {
    path: '',
    component: RegisterComponent
  },
  {
  path: 'profile',
  canActivateChild:[AuthGuard],
  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
