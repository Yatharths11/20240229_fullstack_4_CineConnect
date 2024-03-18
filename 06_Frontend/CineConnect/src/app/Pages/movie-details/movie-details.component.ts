import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.movie = history.state.movie; // Retrieve selected movie from router state
  }

  navigateToBookSeat(movie: any) {
    // Navigate to the bookseat component and pass the movie details
    // Example:
    this.router.navigate(['/bookseat'], { state: { movie: movie } });
  }
}
