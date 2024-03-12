import { Component } from '@angular/core';

// Angular Material based imports
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
  selector: 'app-username-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './username-input.component.html',
  styleUrl: './username-input.component.css',
})
export class UsernameInputComponent {
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
  ]);

  resetController() {
    const value = this.usernameFormControl.value;
    this.usernameFormControl.reset();
    this.usernameFormControl.setValue(value);
  }

  isDirty: boolean = false;
  matcher = new MyErrorStateMatcher();
}