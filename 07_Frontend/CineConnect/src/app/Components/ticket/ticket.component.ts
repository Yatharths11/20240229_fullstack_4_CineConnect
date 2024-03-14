import { Component } from '@angular/core';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
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
