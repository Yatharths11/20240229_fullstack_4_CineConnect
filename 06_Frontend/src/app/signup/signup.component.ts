import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9]*$') // Custom validator for alphabets only
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  usernameInputFocused: boolean = false;
  emailInputFocused: boolean = false;
  passwordInputFocused: boolean = false;

  onFocus(controlName: string) {
    if (controlName === 'userName') {
      this.usernameInputFocused = true;
      
    } else if (controlName === 'email') {
      this.emailInputFocused = true;
      
    } else if (controlName === 'password') {
      this.passwordInputFocused = true;
    }
  }

  onBlur(controlName: string) {
    if (controlName === 'userName') {
      this.usernameInputFocused = false;
    } else if (controlName === 'email') {
      this.emailInputFocused = false;
    } else if (controlName === 'password') {
      this.passwordInputFocused = false;
    }
  }
}
