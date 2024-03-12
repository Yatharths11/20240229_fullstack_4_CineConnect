import { Routes } from '@angular/router'
import { HomeComponent } from './Pages/home/home.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { Component } from '@angular/core';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { CreateShowComponent } from './Pages/create-show/create-show.component';
import { CreateTheatreComponent } from './Pages/create-theatre/create-theatre.component';
import { SigninpageComponent } from './Pages/signinpage/signinpage.component';
import { SignuppageComponent } from './Pages/signuppage/signuppage.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'signin', component: SigninpageComponent },
    {path:'signup',component: SignuppageComponent},
    {path:'adminhomepage',component:AdminHomeComponent},
    {path:'createshow',component:CreateShowComponent},
    {path:'createtheatre',component:CreateTheatreComponent},
    {path:'**',component:PageNotFoundComponent}
];
