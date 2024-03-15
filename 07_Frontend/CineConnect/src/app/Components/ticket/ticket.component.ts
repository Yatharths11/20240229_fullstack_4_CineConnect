import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';
import qrCode from 'razorpay/dist/types/qrCode';
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})

export class TicketComponent implements OnInit {
  movie: any;
  username: any;
  uuid: any;
  booking: any = {};
  decodedToken: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.uuid = uuidv4();
    this.movie = history.state.movie;
    const token = localStorage.getItem('authToken');
    console.log(token);

    // Check if token exists
    if (token) {
      // Decode the token manually
      try {
        this.decodedToken = jwtDecode(token);
        this.username = this.decodedToken.username; // Access username from decoded payload
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle invalid token (e.g., display error message)
      }

      // Set booking details
      this.booking = {
        id: this.uuid,
        date: new Date().toISOString(),
        username: this.username,
        movie_name: this.movie.name,
      };
    }
  }

  get bookingDetails(): string {
    // Convert booking details object to JSON string
    return JSON.stringify(this.booking);
  }
  ticketData = {
    ticketNumber: '20231304',
    venue: 'EMPIRE',
    date: 'JUNE 2024',
    event: 'CineConnect',
    movieName: 'MOVIE NAME',
    featArtist: 'Umesh Shelare',
    startTime: '12:49 PM',
    endTime: 'TBD',
    tagline: 'IN THIS LIFE OR THE NEXT',
    location: 'THE CAT\'S CRADLE',
    city: 'ANDALUCÍA, SPAIN',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com'
  };
}