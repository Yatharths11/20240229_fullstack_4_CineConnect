import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
      Validators.pattern('^[a-zA-Z0-9]*$') // Custom validator for alphabets only
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  usernameInputFocused: boolean = false;
  passwordInputFocused: boolean = false;

  onFocus(controlName: string) {
    if (controlName === 'userName') {
      this.usernameInputFocused = true;

    } else if (controlName === 'password') {
      this.passwordInputFocused = true;
    }
  }

  onBlur(controlName: string) {
    if (controlName === 'userName') {
      this.usernameInputFocused = false;
    } else if (controlName === 'password') {
      this.passwordInputFocused = false;
    }
  }
}
