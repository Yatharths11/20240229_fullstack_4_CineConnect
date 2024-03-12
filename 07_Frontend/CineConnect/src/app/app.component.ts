import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLeftSidebarComponent } from './Components/admin-left-sidebar/admin-left-sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            AdminLeftSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CineConnect';
}
