import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-theatre-card',
  standalone: true,
  imports: [],
  templateUrl: './theatre-card.component.html',
  styleUrl: './theatre-card.component.css'
})
export class TheatreCardComponent {
  @Input()
  theatre!: { name: string; imageUrl: string;};
}
