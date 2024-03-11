import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { ManageShowsComponent } from './manage-shows/manage-shows.component';
import { PaymentComponent } from './payment/payment.component';
import { ManageTheatreComponent } from './manage-theatre/manage-theatre.component';
import { CreateShowComponent } from './create-show/create-show.component';
import { CreateTheatreComponent } from './create-theatre/create-theatre.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    SignupComponent,
    PagenotfoundComponent,
    ManageShowsComponent,
    PaymentComponent,
    ManageTheatreComponent,
    CreateShowComponent,
    CreateTheatreComponent,
    HomeComponent,
    EditProfileComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
