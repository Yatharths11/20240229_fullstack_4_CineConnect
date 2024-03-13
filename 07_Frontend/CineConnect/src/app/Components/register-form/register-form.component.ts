import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

/** Angular Material based class to handle matching of error state */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  signin(){
    console.log("hello")
  }
  
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
  ]);

  resetController() {
    const mailValue = this.emailFormControl.value;
    this.emailFormControl.reset();
    this.emailFormControl.setValue(mailValue);

    const passValue = this.passwordFormControl.value;
    this.passwordFormControl.reset();
    this.passwordFormControl.setValue(passValue);

    const userValue = this.usernameFormControl.value;
    this.usernameFormControl.reset();
    this.usernameFormControl.setValue(userValue);
  }
  
  isDirty: boolean = false;
  matcher = new MyErrorStateMatcher();
}