import { Component, OnInit, Output } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminLeftSidebarComponent } from '../../Components/admin-left-sidebar/admin-left-sidebar.component';
import { AdminMovieCardsComponent } from '../../Components/admin-movie-cards/admin-movie-cards.component';
import { AdminTheaterCardsComponent } from '../../Components/admin-theater-cards/admin-theater-cards.component';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateMovieComponent } from '../../Components/create-movie/create-movie.component';
import { Movie } from '../../Interfaces/movie.model';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarService } from '../../navbar.service';
import { AuthServiceService } from '../../auth-service.service';
import { UserService } from '../../user.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    NavbarComponent,
    AdminLeftSidebarComponent,
    AdminMovieCardsComponent,
    AdminTheaterCardsComponent,
    FontAwesomeModule,
    CreateMovieComponent,
    RouterLink,HttpClientModule,
    MatMenu,MatMenuTrigger,CommonModule
  ],
  providers:[NavbarService,AuthServiceService,UserService],

  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
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

  
  selectedMovie: any = null;
  isEditMode: boolean = false;

  // In the parent component TypeScript file
  onEditMovie(movie: any): void {
    // Ensure the function parameter is of type 'Movie'
    this.router.navigate(['/createshow'], { state: { movie: movie } });
  }

  openCreateMovieForm() {
    this.selectedMovie = null; // Clear selected movie data for creating new movie
    this.isEditMode = false; // Set edit mode flag to false
  }
}
