import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-movie-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-movie-cards.component.html',
  styleUrls: ['./admin-movie-cards.component.css'] // Corrected property name
})
export class AdminMovieCardsComponent {
  movies = [
    {
      "image": "https://m.media-amazon.com/images/M/MV5BMjI0ODc3NjI4NV5BMl5BanBnXkFtZTcwOTc3MzI1OQ@@._V1_SX300.jpg",
      "name": "The Shawshank Redemption",
      "location": "",
      "price": "$ 12.99",
    }
    //add more data here
  ];
}
