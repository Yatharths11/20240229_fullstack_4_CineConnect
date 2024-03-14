import { Component, OnInit } from '@angular/core';
/** Declare Razorpay as an external variable */
declare var Razorpay: any;
import { PaymentService } from '../../payment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-component',
  standalone: true,
  imports: [],
  templateUrl: './payment-component.component.html',
  styleUrl: './payment-component.component.css',
})
export class PaymentComponentComponent implements OnInit {
  movie: any;
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paymentService.totalPrice$.subscribe(
      (price) => (this.totalPrice = price)
    );
  }

  ngOnInit(): void {
    this.movie = history.state.movie;
    console.log('Movie Details:', this.movie);
  }

  totalPrice: number = 0;

  handleSuccessfulPayment() {
    this.router.navigate(['/ticket'], { state: { movie: this.movie } });
  }
  /**
   * Function to handle payment using Razorpay.
   */
  payNow() {
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.totalPrice * 100,
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
      handler: (response: any) => {
        // Navigate to another page upon successful payment
        this.handleSuccessfulPayment();
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
