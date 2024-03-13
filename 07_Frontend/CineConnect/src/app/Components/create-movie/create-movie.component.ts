import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
  http: HttpClient = inject(HttpClient)
  token: string = ""

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

  createNewMovie(){
    const headers = new  HttpHeaders({"token":this.token});
    // const body = new HttpBody(JSON.stringify(this.movie));
    this.http.post("http://localhost:5000/api/movies/post",{headers:headers},this.movie)
    .subscribe((response)=>{
      console.log(response)
    })
  }
}
