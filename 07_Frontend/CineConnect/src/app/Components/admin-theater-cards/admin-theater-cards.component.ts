import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-theater-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-theater-cards.component.html',
  styleUrl: './admin-theater-cards.component.css'
})
export class AdminTheaterCardsComponent {
  theatres = [
    {
      "image":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cineplex.com%2FCorporate%2FInformation.aspx&psig=AOvVaw3JR2jM5d0Z1KA2mQtbbUNi&ust=1710348831479000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPCmtIaY74QDFQAAAAAdAAAAABAE",
      "location":"Hyderabad",
      "name": "The Grand",
      "seats":70
    },
    //add more data here
  ]
}
