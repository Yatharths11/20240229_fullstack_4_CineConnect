import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/** Angular Material based class to handle matching of error state */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && control.touched);
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
    HttpClientModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  apiUrl = 'http://localhost:5000/users/register'; // Adjust the URL as needed
  registrationForm: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
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

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
      username: this.usernameFormControl,
    });
  }

  signup(): void {
    if (this.registrationForm.valid) {
      const { email, password, username } = this.registrationForm.value;

      // Send the registration request to the server
      this.http.post(this.apiUrl, { email, password, username }).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Redirect to login page or show success message as needed
          alert('Registration successful!');
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration error, show error message to the user, etc.
        }
      );
    } else {
      // Mark form controls as touched to display validation messages
      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
      this.usernameFormControl.markAsTouched();
    }
  }
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
