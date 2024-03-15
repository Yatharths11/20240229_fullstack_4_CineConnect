import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { AdminHomeComponent } from '../../Pages/admin-home/admin-home.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports : [FormsModule,
              HttpClientModule,
              ReactiveFormsModule,
              AdminHomeComponent],
  // providers:[FormGroup],
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements  OnInit{
  constructor(
    private http: HttpClient,
    private router:Router,
    private route:ActivatedRoute
    ) {}

    name='';
  theatre_id= '';
  description= '';
  screen= '';
  language= '';
  genre= [];
  price= null;
  ratings= null;
  date= null;
  availableSeats=null;
  pgRating= '';

  ngOnInit():void{
    this.movie = history.state.movie
    this.name = this.movie.name;
    this.theatre_id = this.movie.theatre_id;
    this.description = this.movie.description;
    this.language = this.movie.language;
    this.screen = this.movie.screen;
    this.genre = this.movie.genre;
    this.price = this.movie.price;
    this.ratings = this.movie.ratings;
    this.date = this.movie.date;
    this.availableSeats = this.movie.availableSeats;
    this.pgRating = this.movie.pgRating;
  }

  // Declare variables
  selectedMovie: any; // Assuming it's of type 'any' for simplicity
  isEditMode: boolean = false;
  movie: any; 
  // http: HttpClient = inject(HttpClient)
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEwNDg1MjUxLCJleHAiOjE3MTA1NjgwNTF9.S-6l-NPNq4LC3mMFYM5J6DAzaCLUtEWZ-W-5kxCM2TE";
  



 

  // onSubmit() {
  //   const movieData = {
  //     name: this.name,
  //     theatre_id: this.theatre_id,
  //     description: this.description,
  //     screen: this.screen,
  //     language: this.language,
  //     genre: this.genre,
  //     price: this.price,
  //     ratings: this.ratings,
  //     date: this.date,
  //     availableSeats: this.availableSeats,
  //     pgRating: this.pgRating
  //   };
  //   console.log(movieData)
  //   const headers = new HttpHeaders().set("Authorization", this.token);
  //   this.http.post("http://localhost:5000/movies/post", movieData, { headers })
  //     .subscribe(
  //       (response) => {
  //         console.log(`Movie created. Status: ${response}`);
  //         // Reset form fields
  //         this.resetForm();
  //       }
  //     );
  // }

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
  // ngOnInit() {
  //   if (this.selectedMovie) {
  //     // Populate form fields with selected movie data if in edit mode
  //     this.populateFormWithMovieData();
  //   }
  // }
  
  populateFormWithMovieData() {
    this.name = this.selectedMovie.name;
    this.theatre_id = this.selectedMovie.theatre_id;
    this.description = this.selectedMovie.description;
    this.screen = this.selectedMovie.screen;
    this.language = this.selectedMovie.language;
    this.genre = this.selectedMovie.genre;
    this.price = this.selectedMovie.price;
    this.ratings = this.selectedMovie.ratings;
    this.date = this.selectedMovie.date;
    this.availableSeats = this.selectedMovie.availableSeats;
    this.pgRating = this.selectedMovie.pgRating;
  }
  
  onSubmit() {
    if (this.isEditMode) {
      // Handle update logic
      this.updateMovie();
    } else {
      // Handle create logic
      this.createMovie();
    }
  }
  
  createMovie() {
    // Send POST request to create a new movie
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
  


  updateMovie() {
    // Send PUT request to update the existing movie
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
    this.http.put("http://localhost:5000/movies/post", movieData, { headers })
      .subscribe(
        (response) => {
          console.log(`Movie created. Status: ${response}`);
          // Reset form fields
          this.resetForm();
        }
      );
  }
}


