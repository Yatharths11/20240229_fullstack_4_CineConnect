import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports : [FormsModule,
              HttpClientModule,
              ReactiveFormsModule],
  // providers:[FormGroup],
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent {
  movie: any = {};
  // http: HttpClient = inject(HttpClient)
  token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEwMzkyMTA0LCJleHAiOjE3MTA0MjgxMDR9.u1sNpr3Lkw_aqFrS1H27iFJHGyhrTOGvfBpG_lp1jkg"
  movieForm: any;
  name: any;
  theatre_id: any;
  description: any;
  screen: any;
  language: any;
  genre: any;
  price: any;
  ratings: any;
  date: any;
  availableSeats: any;
  pgRating: any;
  constructor(private http: HttpClient) {}

  onSubmit() {
    const movieData = {
      name: this.name,
      theatre_id: this.theatre_id,
      description: this.description,
      screen: this.screen,
      language: this.language,
      genre: this.genre,
      price: this.price,
      ratings: this.ratings,
      date: this.date,
      availableSeats: this.availableSeats,
      pgRating: this.pgRating
    };
    console.log(movieData)
    const headers = new HttpHeaders().set("Authorization", this.token);
    this.http.post("http://localhost:5000/movies/post", movieData, { headers })
      .subscribe(
        (response) => {
          console.log(`Movie created. Status: ${response}`);
          // Reset form fields
          this.resetForm();
        }
      );
  }

  resetForm() {
    this.name = '';
    this.theatre_id = '';
    this.description = '';
    this.screen = '';
    this.language = '';
    this.genre = [];
    this.price = null;
    this.ratings = null;
    this.date = null;
    this.availableSeats = null;
    this.pgRating = '';
  }
}
