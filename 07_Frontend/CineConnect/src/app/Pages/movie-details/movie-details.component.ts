import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  
}
