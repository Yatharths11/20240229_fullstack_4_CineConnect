import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminLeftSidebarComponent } from '../../Components/admin-left-sidebar/admin-left-sidebar.component';
import { AdminMovieCardsComponent } from '../../Components/admin-movie-cards/admin-movie-cards.component';
import { AdminTheaterCardsComponent } from '../../Components/admin-theater-cards/admin-theater-cards.component';
import { CreateMovieComponent } from '../../Components/create-movie/create-movie.component';
import { CreateTheatersComponent } from '../../Components/create-theaters/create-theaters.component';

@Component({
  selector: 'app-create-theatre',
  standalone: true,
  imports: [NavbarComponent,
    AdminLeftSidebarComponent,
    AdminMovieCardsComponent,
    AdminTheaterCardsComponent,
    CreateMovieComponent,
    CreateTheatersComponent],
  templateUrl: './create-theatre.component.html',
  styleUrl: './create-theatre.component.css'
})
export class CreateTheatreComponent {

}
