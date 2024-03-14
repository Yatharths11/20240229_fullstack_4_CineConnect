import { Component } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css',
})
export class PaymentGatewayComponent {
  initializeRazorpay(): void {
    const options = {
      key: 'rzp_test_eTVmRkIK9Jufgf', // Replace with your actual Razorpay key
      amount: 50000, // Amount in paisa (e.g., 50000 for Rs. 500)
      currency: 'INR',
      name: 'CineConnect',
      description: 'Payment for movie tickets',
      image: '../assets/cc_rax.svg',
      // order_id: 'your_order_id', // Generate a unique order ID
      handler: (response: any) => {
        // Handle success callback
        console.log('Payment success:', response);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '1234567890',
      },
      theme: {
        color: '#d90429', // Customize the Razorpay checkout theme color
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  }
}
