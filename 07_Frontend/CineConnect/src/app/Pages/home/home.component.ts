import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../../Components/movie-card/movie-card.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { TheatreCardComponent } from '../../Components/theatre-card/theatre-card.component';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FontAwesomeModule,
    RouterLink,
    CommonModule,
    NgbCarouselModule,
    FormsModule,
    MovieCardComponent,
    FooterComponent,
    TheatreCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[AuthServiceService]
})
export class HomeComponent {
  images = [62, 83, 466, 965, 982, 1043, 738].map(
    (n) => `https://picsum.photos/id/${n}/1513/415`
  );

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel: NgbCarousel = new NgbCarousel();

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  movies = [
    { name: 'Movie 1', imageUrl: '../../assets/movie1.jpg', genre: 'Action' },
    { name: 'Movie 2', imageUrl: '../../assets/movie2.jpg', genre: 'Comedy' },
    { name: 'Movie 1', imageUrl: '../../assets/movie3.jpg', genre: 'Action' },
    { name: 'Movie 1', imageUrl: '../../assets/movie3.jpg', genre: 'Action' },
    { name: 'Movie 2', imageUrl: '../../assets/movie2.jpg', genre: 'Comedy' },
    { name: 'Movie 1', imageUrl: '../../assets/movie3.jpg', genre: 'Action' },
    { name: 'Movie 2', imageUrl: '../../assets/movie2.jpg', genre: 'Comedy' },
    { name: 'Movie 1', imageUrl: '../../assets/movie3.jpg', genre: 'Action' },
    { name: 'Movie 2', imageUrl: '../../assets/movie2.jpg', genre: 'Comedy' },
    { name: 'Movie 1', imageUrl: '../../assets/movie3.jpg', genre: 'Action' },
    { name: 'Movie 2', imageUrl: '../../assets/movie2.jpg', genre: 'Comedy' },
    { name: 'Movie 1', imageUrl: '../../assets/movie3.jpg', genre: 'Action' },
    { name: 'Movie 2', imageUrl: '../../assets/movie2.jpg', genre: 'Comedy' },
    { name: 'Movie 1', imageUrl: '../../assets/movie3.jpg', genre: 'Action' },
    { name: 'Movie 2', imageUrl: '../../assets/movie2.jpg', genre: 'Comedy' },
    // Add more movies as needed
  ];

  theatre = [
    { name: 'Theatre 1', imageUrl: '../../assets/theatre1.jpg' },
    { name: 'Theatre 2', imageUrl: '../../assets/theatre2.jpg' },
    { name: 'Theatre 3', imageUrl: '../../assets/theatre3.jpg' },
    { name: 'Theatre 3', imageUrl: '../../assets/theatre2.jpg' },
    { name: 'Theatre 2', imageUrl: '../../assets/theatre2.jpg' },
    // Add more movies as needed
  ];

  faCirclePlay = faCirclePlay;
}
