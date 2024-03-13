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
  selector: 'app-email-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.css',
})
export class EmailInputComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  resetController() {
    const value = this.emailFormControl.value;
    this.emailFormControl.reset();
    this.emailFormControl.setValue(value);
  }
  
  matcher = new MyErrorStateMatcher();
}