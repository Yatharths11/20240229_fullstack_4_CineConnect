import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports : [FormsModule],
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent {
  movie: any = {};

  createMovie() {
    const movieData = {
      name: this.movie.name,
      genre: this.movie.genre,
      language: this.movie.language,
      theatre: this.movie.theatre,
      date: this.movie.date,
      rating: this.movie.rating,
      ticketPrice: this.movie.ticketPrice,
      posterLink: this.movie.posterLink
    };

    console.log('Created Movie:', movieData);
  }
}
