import { Component, OnInit } from '@angular/core';
import { MovieSeatBookComponent } from '../../Components/movie-seat-book-component/movie-seat-book-component.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { MovieCardComponent } from '../../Components/movie-card/movie-card.component';
import { PaymentComponentComponent } from '../../Components/payment-component/payment-component.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-ticket-page',
  standalone: true,
  imports: [
    MovieSeatBookComponent,
    NavbarComponent,
    MovieCardComponent,
    PaymentComponentComponent,
    RouterLink
  ],
  templateUrl: './book-ticket-page.component.html',
  styleUrl: './book-ticket-page.component.css',
})
export class BookTicketPageComponent implements OnInit {
  movie:any
  totalPrice: number = 0;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.movie = history.state.movie;
    console.log('Movie Details:', this.movie);
  }

  onTotalPriceChange(newTotalPrice: number) {
    this.totalPrice = newTotalPrice;
    console.log('Total price from child:', this.totalPrice);
  }

  gettotalPrice() {
    console.log(this.totalPrice);
  }

  bookedTickets: any[] = [
    {
      row: 'A',
      seat: 3,
    },
    {
      row: 'b',
      seat: 4,
    },
    {
      row: 'c',
      seat: 6,
    },
  ];
}
