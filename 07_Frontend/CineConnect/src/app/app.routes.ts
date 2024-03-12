import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'**',component:PageNotFoundComponent}
];
