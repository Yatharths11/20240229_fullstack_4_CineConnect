import { Component } from '@angular/core';
import { SigninComponentComponent } from '../../Components/signin-component/signin-component.component';

@Component({
  selector: 'app-signinpage',
  standalone: true,
  imports: [SigninComponentComponent],
  templateUrl: './signinpage.component.html',
  styleUrl: './signinpage.component.css'
})
export class SigninpageComponent {

}