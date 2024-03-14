import { Component } from '@angular/core';
import { TicketComponent } from '../../Components/ticket/ticket.component';

@Component({
  selector: 'app-ticket-page',
  standalone: true,
  imports: [TicketComponent],
  templateUrl: './ticket-page.component.html',
  styleUrl: './ticket-page.component.css'
})
export class TicketPageComponent {
  
}
