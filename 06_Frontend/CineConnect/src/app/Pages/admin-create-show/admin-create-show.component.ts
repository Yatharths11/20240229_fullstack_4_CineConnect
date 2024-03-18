import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminLeftSidebarComponent } from '../../Components/admin-left-sidebar/admin-left-sidebar.component';
import { AdminMovieCardsComponent } from '../../Components/admin-movie-cards/admin-movie-cards.component';
import { AdminTheaterCardsComponent } from '../../Components/admin-theater-cards/admin-theater-cards.component';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateMovieComponent } from "../../Components/create-movie/create-movie.component";

@Component({
    selector: 'app-admin-create-show',
    standalone: true,
    templateUrl: './admin-create-show.component.html',
    styleUrl: './admin-create-show.component.css',
    imports: [NavbarComponent,
        AdminLeftSidebarComponent,
        AdminMovieCardsComponent,
        AdminTheaterCardsComponent,
        FontAwesomeModule, CreateMovieComponent,]
})
export class AdminCreateShowComponent {
  accountIcon = faCircleUser
}
