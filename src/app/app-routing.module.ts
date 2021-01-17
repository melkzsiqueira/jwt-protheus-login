import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationGuard } from '../app/guards/authentication/authentication.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
