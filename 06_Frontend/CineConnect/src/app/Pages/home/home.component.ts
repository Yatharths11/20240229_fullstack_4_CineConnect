import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faCirclePlay, faCircleUser } from '@fortawesome/free-solid-svg-icons';

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
import { NavbarService } from '../../navbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../user.service';

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
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [AuthServiceService, UserService, NavbarService],
})
export class HomeComponent {
  images = [
    "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdmllc3xlbnwwfDB8MHx8fDA%3D",
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWVzfGVufDB8MHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1618343931116-fadc431fdec3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fG1vdmllc3xlbnwwfDB8MHx8fDA%3D',
  ];
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
    {
      name: 'Why Him?',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNDlkMDQ1NzUtNGE3OC00NmUwLWI0NjAtNDJmODUzY2NhOGIzL2ltYWdlXkEyXkFqcGdeQXVyNDg2MjUxNjM@._V1_SX300.jpg',
      genre: ['Comedy'],
      description:
        "A dad forms a bitter rivalry with his daughter's young rich boyfriend.",
      year: 2016,
      rating: 6.2,
    },
    {
      name: "Why We're Killing Gunther",
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMTgyMjUwNjYxNl5BMl5BanBnXkFtZTgwOTU0NjczMzI@._V1_SX300.jpg',
      genre: ['Action', 'Comedy'],
      description:
        "A group of eccentric assassins are fed up with Gunther, the world's greatest hitman, and decide to kill him.",
      year: 2017,
      rating: 4.7,
    },
    {
      name: 'Why Did I Get Married?',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMjAzMDM0Nzg3OV5BMl5BanBnXkFtZTcwNzMxOTI1MQ@@._V1_SX300.jpg',
      genre: ['Comedy', 'Drama'],
      description:
        'Couples gather for their annual marriage retreat, only for one of them to share a big secret.',
      year: 2007,
      rating: 5.8,
    },
    {
      name: 'Why We Fight',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMTY2NzU2MjM0MF5BMl5BanBnXkFtZTYwMDMwNDE3._V1_SX300.jpg',
      genre: ['Documentary'],
      description:
        "A documentary exploring the historical reasons behind America's wars.",
      year: 2005,
      rating: 7.0,
    },
    {
      name: 'Why Did I Get Married Too?',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMjIwMDc4MDgyMF5BMl5BanBnXkFtZTcwNjgxODkxMw@@._V1_SX300.jpg',
      genre: ['Comedy', 'Drama'],
      description:
        'Couples gather for their annual marriage retreat, where secrets are revealed and relationships are tested.',
      year: 2010,
      rating: 4.6,
    },
    {
      name: "Why Don't You Play in Hell?",
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BZTczNmY5NTQtNzQ5Ni00YjYwLWIzM2EtOGJlNzkxMmZiYWFjXkEyXkFqcGdeQXVyNTQyODc1OTY@._V1_SX300.jpg',
      genre: ['Action', 'Comedy'],
      description:
        'A renegade film crew becomes entangled with yakuza and rival gangs while making a movie.',
      year: 2013,
      rating: 7.1,
    },
    {
      name: 'Why Stop Now?',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMTUxNDU0MzAwNF5BMl5BanBnXkFtZTcwMzU4ODgwOA@@._V1_SX300.jpg',
      genre: ['Drama'],
      description:
        'A young piano prodigy struggles to keep his mother out of rehab after a chance encounter with a drug dealer.',
      year: 2012,
      rating: 5.6,
    },
    {
      name: "Why Don't You Just Die!",
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BZmQ3OGExMzktM2Q2MC00NmFlLWI3ZjItMjVlN2Q3YjE3NTM0XkEyXkFqcGdeQXVyMTg0MTI3Mg@@._V1_SX300.jpg',
      genre: ['Action', 'Comedy', 'Crime'],
      description:
        "A man tries to kill his girlfriend's father, but things don't go as planned.",
      year: 2018,
      rating: 6.9,
    },
    {
      name: 'Bill Burr: Why Do I Do This?',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BMjI3OTcxNTA1MV5BMl5BanBnXkFtZTgwNDY2MjA2MDE@._V1_SX300.jpg',
      genre: ['Comedy'],
      description:
        'Bill Burr talks about marriage, dating, sports, and the differences between men and women.',
      year: 2008,
      rating: 8.2,
    },
    {
      name: 'Why Did You Kill Me?',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BODBjM2Y3ZjctYzZhNS00ZjRkLThhYzgtZDJjYjk2NWViMWMwXkEyXkFqcGdeQXVyNjEwNTM2Mzc@._V1_SX300.jpg',
      genre: ['Documentary', 'Crime'],
      description:
        'The story of a mother who used MySpace to find the men who killed her daughter.',
      year: 2021,
      rating: 6.2,
    },
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
  accountIcon = faCircleUser;

  isLoggedIn = this.navbarService.isAuthenticated();

  constructor(
    private navbarService: NavbarService,
    private authService: AuthServiceService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.navbarService.isLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  userInfo: any;
  viewProfile(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        console.log('User Info:', response);
        this.userInfo = response; // Store user information
        // Additional logic to display the information (e.g., open a modal)
        // Display the user information as needed
      },
      (error) => {
        console.error('Failed to fetch user info:', error);
        // Handle error
      }
    );
  }

  logout(): void {
    // Implement logic to log out the user
    this.authService.clearToken();
    // Optionally, you can navigate to the login page or perform other actions
    console.log('Logout clicked');

  }

  onMovieSelected(movie: any): void {
    this.router.navigate(['/moviedetails'], { state: { movie: movie } }); // Navigate to movie details page with selected movie
  }
}
