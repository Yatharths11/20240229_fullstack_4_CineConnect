import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from '../../Interfaces/movie.model';
import { MovieService } from '../../movie.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-movie-cards',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-movie-cards.component.html',
  styleUrls: ['./admin-movie-cards.component.css'], // Corrected property name
  providers:[MovieService,HttpClient]
})
export class AdminMovieCardsComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(
      (movies) => {
        this.movies = movies;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  navigateTo(movie: any) {
    this.router.navigate(['/createshow'], { state: { movie: movie } });
  }

  // ngOnInit():void {

  // }
  // constructor(private router:Router){}
  // movies = [
  //   {
  //     "image": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
  //     "name": "Avengers: Endgame",
  //     "theatre_id": "PVR",
  //     "description": "The Avengers must assemble to reverse Thanos' actions and restore balance to the universe.",
  //     "screen": "Audi_01",
  //     "language": "English",
  //     "genre": ["Action", "Adventure", "Sci-Fi"],
  //     "price": 10,
  //     "ratings": 4.5,
  //     "date": "2024-04-01T19:30:00Z",
  //     "availableSeats": 150,
  //     "pgRating": "PG-13"
  //   },
  //   {
  //     "image":"https://m.media-amazon.com/images/M/MV5BMjE2NDQxODMyM15BMl5BanBnXkFtZTcwOTQ2Nzg4OQ@@._V1_SX300.jpg",
  //     "name": "La La Land",
  //     "theatre_id": "PVR",
  //     "description": "A jazz pianist falls for an aspiring actress in Los Angeles.",
  //     "screen": "Audi_02",
  //     "language": "French",
  //     "genre": ["Comedy", "Drama", "Music"],
  //     "price": 15,
  //     "ratings": 4.2,
  //     "date": "2024-04-02T20:00:00Z",
  //     "availableSeats": 120,
  //     "pgRating": "PG"
  //   },
  //   {
  //     "image":"https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg",
  //     "name": "The Conjuring",
  //     "theatre_id": "PVR",
  //     "description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
  //     "screen": "Audi_03",
  //     "language": "Spanish",
  //     "genre": ["Horror", "Mystery", "Thriller"],
  //     "price": 12,
  //     "ratings": 4.0,
  //     "date": "2024-04-03T21:00:00Z",
  //     "availableSeats": 100,
  //     "pgRating": "R"
  //   },
  //   {
  //     "image":"https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg",
  //     "name": "Toy Story",
  //     "theatre_id": "PVR",
  //     "description": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
  //     "screen": "Audi_04",
  //     "language": "English",
  //     "genre": ["Animation", "Adventure", "Comedy"],
  //     "price": 8,
  //     "ratings": 4.7,
  //     "date": "2024-04-04T14:00:00Z",
  //     "availableSeats": 200,
  //     "pgRating": "G"
  //   },
  //   {
  //     "image":"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //     "name": "Inception",
  //     "theatre_id": "PVR",
  //     "description": "A thief who enters the dreams of others to steal their secrets from their subconscious.",
  //     "screen": "Audi_05",
  //     "language": "English",
  //     "genre": ["Action", "Adventure", "Sci-Fi"],
  //     "price": 14,
  //     "ratings": 4.6,
  //     "date": "2024-04-05T18:30:00Z",
  //     "availableSeats": 180,
  //     "pgRating": "PG-13"
  //   }

  // ];
  // navigateto(movie:any){
  //   this.router.navigate(['/createshow'],{state:{movie:movie}})
  // }
}
