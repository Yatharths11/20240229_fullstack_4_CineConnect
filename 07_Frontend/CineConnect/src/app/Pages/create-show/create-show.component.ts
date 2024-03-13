import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminLeftSidebarComponent } from '../../Components/admin-left-sidebar/admin-left-sidebar.component';
import { AdminMovieCardsComponent } from '../../Components/admin-movie-cards/admin-movie-cards.component';
import { AdminTheaterCardsComponent } from '../../Components/admin-theater-cards/admin-theater-cards.component';
import { CreateMovieComponent } from '../../Components/create-movie/create-movie.component';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-create-show',
  standalone: true,
  imports: [NavbarComponent,
    AdminLeftSidebarComponent,
    AdminMovieCardsComponent,
    AdminTheaterCardsComponent,
    CreateMovieComponent,
    FontAwesomeModule],
  templateUrl: './create-show.component.html',
  styleUrl: './create-show.component.css'
})
export class CreateShowComponent {
  accountIcon = faCircleUser
}
