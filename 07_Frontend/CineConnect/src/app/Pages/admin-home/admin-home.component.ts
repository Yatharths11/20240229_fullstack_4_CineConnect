import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminLeftSidebarComponent } from '../../Components/admin-left-sidebar/admin-left-sidebar.component';
import { AdminMovieCardsComponent } from '../../Components/admin-movie-cards/admin-movie-cards.component';
import { AdminTheaterCardsComponent } from '../../Components/admin-theater-cards/admin-theater-cards.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent,
            AdminLeftSidebarComponent,
            AdminMovieCardsComponent,
            AdminTheaterCardsComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
