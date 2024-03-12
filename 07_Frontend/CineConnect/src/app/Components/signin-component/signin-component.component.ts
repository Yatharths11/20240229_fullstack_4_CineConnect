import { Component } from '@angular/core';

import { EmailInputComponent } from '../email-input/email-input.component';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-signin-component',
  standalone: true,
  imports: [EmailInputComponent,
    PasswordInputComponent,],
  templateUrl: './signin-component.component.html',
  styleUrl: './signin-component.component.css'
})
export class SigninComponentComponent {
  

  

}




