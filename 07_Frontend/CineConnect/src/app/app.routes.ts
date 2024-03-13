import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { SigninpageComponent } from './Pages/signinpage/signinpage.component';
import { SignuppageComponent } from './Pages/signuppage/signuppage.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'signin',component:SigninpageComponent},
    {path:'signup',component:SignuppageComponent},
    {path:'adminhomepage',component:AdminHomeComponent},
    {path:'**',component:PageNotFoundComponent},

];
