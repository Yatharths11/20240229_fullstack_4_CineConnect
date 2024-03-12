import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../Components/register-form/register-form.component';

@Component({
  selector: 'app-signuppage',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css'
})
export class SignuppageComponent {

}
