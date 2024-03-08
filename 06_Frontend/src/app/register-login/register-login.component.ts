import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})

export class RegisterLoginComponent{
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

  get username(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

 }
