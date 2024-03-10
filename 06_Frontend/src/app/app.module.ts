import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterLoginComponent,
    ForgotpasswordComponent,
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
