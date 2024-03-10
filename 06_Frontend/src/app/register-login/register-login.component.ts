import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})

export class RegisterLoginComponent {
  isformInvalid: boolean = false;

  registerForm = new FormGroup({
     userName: new FormControl('', [
       Validators.required,
       Validators.minLength(4),
       Validators.maxLength(100),
       Validators.pattern('^[a-zA-Z0-9]*$') // Custom validator for alphabets only
     ]),
     email: new FormControl('', [
       Validators.required,
       Validators.email
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
      console.log("username pe focus")
      console.log(this.usernameInputFocused);
      
    } else if (controlName === 'email') {
      this.emailInputFocused = true;
      console.log("email pe focus")
      console.log(this.emailInputFocused);
      
    } else if (controlName === 'password') {
      this.passwordInputFocused = true;
      console.log("password pe focus")
      console.log(this.passwordInputFocused);
      
    }
  }

  onBlur(controlName: string) {
    if (controlName === 'userName') {
      this.usernameInputFocused = false;
      console.log(this.usernameInputFocused);
      console.log("username pe blur")
    } else if (controlName === 'email') {
      this.emailInputFocused = false;
      console.log(this.emailInputFocused);
      console.log("email pe blur")
    } else if (controlName === 'password') {
      this.passwordInputFocused = false;
      console.log(this.passwordInputFocused);
      console.log("pass pe blur")
    }
  }

}
