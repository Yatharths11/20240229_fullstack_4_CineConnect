import { Routes } from '@angular/router';
import { SigninpageComponent } from './Pages/signinpage/signinpage.component';
import { SignuppageComponent } from './Pages/signuppage/signuppage.component';

export const routes: Routes = [
    { path: 'signin', component: SigninpageComponent },
    {path: 'signup',component: SignuppageComponent}
];
