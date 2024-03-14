import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { Component } from '@angular/core';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { CreateShowComponent } from './Pages/create-show/create-show.component';
import { CreateTheatreComponent } from './Pages/create-theatre/create-theatre.component';
import { SigninpageComponent } from './Pages/signinpage/signinpage.component';
import { SignuppageComponent } from './Pages/signuppage/signuppage.component';
import { PageNotFoundPageComponent } from './Pages/page-not-found-page/page-not-found-page.component';
import { BookTicketPageComponent } from './Pages/book-ticket-page/book-ticket-page.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { QrComponent } from './Components/qr/qr.component';
import { MovieDetailsComponent } from './Pages/movie-details/movie-details.component';
import { TicketPageComponent } from './Pages/ticket-page/ticket-page.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    { path: 'pay', component: PaymentGatewayComponent },
    {path:'qr',component:QrComponent},
    {path:'adminhomepage',component:AdminHomeComponent},
    {path:'createshow',component:CreateShowComponent},
    {path:'createtheatre',component:CreateTheatreComponent},
    {path:'bookseat',component:BookTicketPageComponent},
    {path:'signin',component:SigninpageComponent},
    {path:'signup',component:SignuppageComponent},
    {path:'adminhomepage',component:AdminHomeComponent},
    {path:'moviedetails',component:MovieDetailsComponent},
    {path:"ticket",component:TicketPageComponent},
    {path:'**',component:PageNotFoundPageComponent},
];
