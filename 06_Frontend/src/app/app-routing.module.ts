import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [

  // { path: '/', component: RegisterLoginComponent },
  // { path: '/forgot-password', component : ForgotpasswordComponent}
  // { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
