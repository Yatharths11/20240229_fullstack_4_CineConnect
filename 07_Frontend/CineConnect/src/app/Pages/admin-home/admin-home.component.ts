import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { AdminLeftSidebarComponent } from '../../Components/admin-left-sidebar/admin-left-sidebar.component';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent,AdminLeftSidebarComponent,FontAwesomeModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  accountIcon = faCircleUser
}
