import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie: any; // Input property to receive movie information
  @Output() movieClicked: EventEmitter<any> = new EventEmitter<any>(); // Event emitter for movie click event

  onMovieClick(): void {
    this.movieClicked.emit(this.movie); // Emit the selected movie information
  }
}
