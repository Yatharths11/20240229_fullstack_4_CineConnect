import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})

export class RegisterLoginComponent {
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
  })
  
  email: string = '';
  showWarning: boolean = false;

  onFocus() {
    this.showWarning = false;
  }

  onBlur() {
    this.showWarning = true;
  }

  isValidEmail() {
    // Implement your email validation logic
    // For simplicity, this example uses a basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
 }
