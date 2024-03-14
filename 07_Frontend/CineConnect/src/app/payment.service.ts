import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private totalPriceSource = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSource.asObservable();

  updateTotalPrice(newTotalPrice: number) {
    this.totalPriceSource.next(newTotalPrice);
  }
}
