import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms'; 

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$')

    ])
  });

  emailInputFocused: boolean = false;

  onFocus(controlName: string) {
    this.emailInputFocused = true;
  }

  onBlur(controlName: string) {
    this.emailInputFocused = false;
  }
}
