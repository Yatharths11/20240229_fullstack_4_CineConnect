import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QrComponent {
  booking = {
    id: '123456',
    date: '2024-03-14',
    username: 'Mayuresh',
    movie_name:"Spiderman"
  };
  
  get bookingDetails(): string {
    // Convert booking details object to JSON string
    return JSON.stringify(this.booking);
  }
}
