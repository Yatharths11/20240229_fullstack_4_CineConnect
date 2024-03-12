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
    // const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }
}

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
})
export class PasswordInputComponent {
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);

  resetController() {
    const value = this.passwordFormControl.value;
    this.passwordFormControl.reset();
    this.passwordFormControl.setValue(value);
  }

  matcher = new MyErrorStateMatcher();
}
