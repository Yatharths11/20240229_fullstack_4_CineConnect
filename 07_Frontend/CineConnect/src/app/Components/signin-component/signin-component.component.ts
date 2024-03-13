import { Component, OnInit } from '@angular/core';
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
import { AuthServiceService } from '../../auth-service.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthInterceptor } from '../../auth-interceptor';

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
  selector: 'app-signin-component',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './signin-component.component.html',
  styleUrl: './signin-component.component.css',
  providers: [AuthServiceService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
})
export class SigninComponentComponent {
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);

  resetController() {
    const userValue = this.usernameFormControl.value;
    this.usernameFormControl.reset();
    this.usernameFormControl.setValue(userValue);

    const passValue = this.passwordFormControl.value;
    this.passwordFormControl.reset();
    this.passwordFormControl.setValue(passValue);
  }

  isDirty: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  signin(): void {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      const username = this.usernameFormControl.value;
      const password = this.passwordFormControl.value;

      this.authService.signin(username, password).subscribe(
        (response) => {
          console.log('Login successful:', response);

          this.authService.setToken(response.token);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    } else {
      this.usernameFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
    }
  }
}
