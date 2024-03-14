import { Component } from '@angular/core';
/** Declare Razorpay as an external variable */
declare var Razorpay: any;
import { PaymentService } from '../../payment.service';

@Component({
  selector: 'app-payment-component',
  standalone: true,
  imports: [],
  templateUrl: './payment-component.component.html',
  styleUrl: './payment-component.component.css'
})
export class PaymentComponentComponent {
  totalPrice: number = 0;

  constructor(private paymentService: PaymentService) {
    this.paymentService.totalPrice$.subscribe(price => (this.totalPrice = price));
  }

  /**
   * Function to handle payment using Razorpay.
   */
  payNow() {
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.totalPrice*100,
      name: 'CineConnect',
      key: 'rzp_test_OaFc3NxBZxWSHF',
      image: '../../../assets/cineConnectLogo.svg',
      prefill: {
        name: 'Gaurav Pathak',
        email: 'gauravpathak2@gmail.com',
        contact: '8459247750',
      },
      theme: {
        color: '#d90429',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        },
      },
    };

    const successCallback = (paymentId: any) => {
      console.log('Payment successful with ID:', paymentId);
    };

    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };

    Razorpay.open(options, successCallback, failureCallback);
  }
}
