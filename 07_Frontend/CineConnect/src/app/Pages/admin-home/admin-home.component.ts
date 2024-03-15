import { Component, OnInit, Output } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminLeftSidebarComponent } from '../../Components/admin-left-sidebar/admin-left-sidebar.component';
import { AdminMovieCardsComponent } from '../../Components/admin-movie-cards/admin-movie-cards.component';
import { AdminTheaterCardsComponent } from '../../Components/admin-theater-cards/admin-theater-cards.component';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateMovieComponent } from '../../Components/create-movie/create-movie.component';
import { Movie } from '../../Interfaces/movie.model'
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent,
            AdminLeftSidebarComponent,
            AdminMovieCardsComponent,
            AdminTheaterCardsComponent,
            FontAwesomeModule,
            CreateMovieComponent,
            RouterLink],

  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
  ngOnInit(): void {
      
  }
  

  accountIcon = faCircleUser
  movies = [
    {
      "name": "Avengers: Endgame",
      "theatre_id": "<theatre_id>",
      "description": "The Avengers must assemble to reverse Thanos' actions and restore balance to the universe.",
      "screen": "Audi_01",
      "language": "English",
      "genre": ["Action", "Adventure", "Sci-Fi"],
      "price": 10,
      "ratings": 4.5,
      "date": "2024-04-01T19:30:00Z",
      "availableSeats": 150,
      "pgRating": "PG-13"
    },
    {
      "name": "La La Land",
      "theatre_id": "<theatre_id>",
      "description": "A jazz pianist falls for an aspiring actress in Los Angeles.",
      "screen": "Audi_02",
      "language": "French",
      "genre": ["Comedy", "Drama", "Music"],
      "price": 15,
      "ratings": 4.2,
      "date": "2024-04-02T20:00:00Z",
      "availableSeats": 120,
      "pgRating": "PG"
    },
    {
      "name": "The Conjuring",
      "theatre_id": "<theatre_id>",
      "description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
      "screen": "Audi_03",
      "language": "Spanish",
      "genre": ["Horror", "Mystery", "Thriller"],
      "price": 12,
      "ratings": 4.0,
      "date": "2024-04-03T21:00:00Z",
      "availableSeats": 100,
      "pgRating": "R"
    },
    {
      "name": "Toy Story",
      "theatre_id": "<theatre_id>",
      "description": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
      "screen": "Audi_04",
      "language": "English",
      "genre": ["Animation", "Adventure", "Comedy"],
      "price": 8,
      "ratings": 4.7,
      "date": "2024-04-04T14:00:00Z",
      "availableSeats": 200,
      "pgRating": "G"
    },
    {
      "name": "Inception",
      "theatre_id": "<theatre_id>",
      "description": "A thief who enters the dreams of others to steal their secrets from their subconscious.",
      "screen": "Audi_05",
      "language": "English",
      "genre": ["Action", "Adventure", "Sci-Fi"],
      "price": 14,
      "ratings": 4.6,
      "date": "2024-04-05T18:30:00Z",
      "availableSeats": 180,
      "pgRating": "PG-13"
    }                
  ]


  constructor(private router:Router) { }
  selectedMovie: any = null;
  isEditMode: boolean = false;

  // In the parent component TypeScript file
  onEditMovie(movie:any) :void{ 
    // Ensure the function parameter is of type 'Movie'
    this.router.navigate(['/createshow'],{state: {movie:movie}})

  }

openCreateMovieForm() {
  this.selectedMovie = null; // Clear selected movie data for creating new movie
  this.isEditMode = false; // Set edit mode flag to false
}

}
