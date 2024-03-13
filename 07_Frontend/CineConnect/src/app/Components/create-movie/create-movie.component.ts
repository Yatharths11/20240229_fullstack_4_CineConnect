import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports : [FormsModule,
              HttpClientModule],
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent {
  movie: any = {};
  // http: HttpClient = inject(HttpClient)
  token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVtZXNoIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTAzMzc2NTcsImV4cCI6MTcxMDM3MzY1N30.x1_rREkQpP7Dj_Vj6I--rfTEdfjGNVg4DORbU18Fah4"
  constructor(private http: HttpClient) {}

  createNewMovie() {
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

    const headers = new HttpHeaders().set("authorization", this.token);
    this.http.post("http://localhost:5000/movies/post", movieData, { headers })
      .subscribe(
        (response) => {
          console.log(`Status: ${response}`);
        }
      );
  }
}
