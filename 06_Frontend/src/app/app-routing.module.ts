import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateShowComponent } from './create-show/create-show.component';
import { CreateTheatreComponent } from './create-theatre/create-theatre.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ManageTheatreComponent } from './manage-theatre/manage-theatre.component';
import { ManageShowsComponent } from './manage-shows/manage-shows.component';
import { PaymentComponent } from './payment/payment.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'home', component : HomeComponent},
  { path: 'create-show', component: CreateShowComponent },
  { path: 'create-theatre', component: CreateTheatreComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'manage-theatre', component: ManageTheatreComponent },
  { path: 'manage-shows', component: ManageShowsComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'edit-profile', component: EditProfileComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to login if no matching route
  { path: '**', component: PagenotfoundComponent } // Redirect to page not found for unknown routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
