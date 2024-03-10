import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  paymentForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]*$') // Only alphabets and spaces allowed
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$')
    ]),
    expiryDate: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0[1-9]|1[0-2])/([2-9][5-9]|[3-4][0-9]|50)$')
    ]),
    cvc: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{3}$') // Exactly 3 digits
    ]),
    nameOnCard: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$') // Only alphabets and spaces allowed
    ]),
    card: new FormControl('', [
      Validators.required,
      Validators.pattern('^(\d{4} ?){4}$') // 16 digits with groups of 4 separated by space
    ])
  });

  inputFocused: { [key: string]: boolean } = {};

  onFocus(controlName: string) {
    this.inputFocused[controlName] = true;
    // console.log(controlName,this.inputFocused[controlName])
  }

  onBlur(controlName: string) {
    this.inputFocused[controlName] = false;
    // console.log(controlName,this.inputFocused[controlName])
  }
}
