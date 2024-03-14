import { Component } from '@angular/core';
import { MovieSeatBookComponent } from '../../Components/movie-seat-book-component/movie-seat-book-component.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { MovieCardComponent } from '../../Components/movie-card/movie-card.component';
@Component({
  selector: 'app-book-ticket-page',
  standalone: true,
  imports: [MovieSeatBookComponent,NavbarComponent,MovieCardComponent],
  templateUrl: './book-ticket-page.component.html',
  styleUrl: './book-ticket-page.component.css'
})
export class BookTicketPageComponent {
  bookedTickets: any[]=[
    {
      row:'A', seat:3
    },
    {
      row:'b', seat:4
    },
    {
      row:'c', seat:6
    }
]

movie = 
  { name: 'X-Men', imageUrl: '../../assets/movie1.jpg', genre: 'Action' }
}
