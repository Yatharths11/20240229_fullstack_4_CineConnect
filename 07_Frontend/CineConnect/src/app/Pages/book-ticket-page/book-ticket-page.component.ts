import { Component } from '@angular/core';
import { MovieSeatBookComponent } from '../../Components/movie-seat-book-component/movie-seat-book-component.component';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { MovieCardComponent } from '../../Components/movie-card/movie-card.component';
import { PaymentComponentComponent } from '../../Components/payment-component/payment-component.component';
@Component({
  selector: 'app-book-ticket-page',
  standalone: true,
  imports: [MovieSeatBookComponent,NavbarComponent,MovieCardComponent,PaymentComponentComponent],
  templateUrl: './book-ticket-page.component.html',
  styleUrl: './book-ticket-page.component.css'
})
export class BookTicketPageComponent {
  totalPrice: number = 0;

constructor() {}

onTotalPriceChange(newTotalPrice: number) {
  this.totalPrice = newTotalPrice;
  console.log('Total price from child:', this.totalPrice);
}

gettotalPrice(){
  console.log(this.totalPrice)
}
  
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
  { name: 'X-Men',Price:'250', imageUrl: '../../assets/movie1.jpg', genre: ['Action'] }
}
