import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponentComponent } from './payment-component.component';

describe('PaymentComponentComponent', () => {
  let component: PaymentComponentComponent;
  let fixture: ComponentFixture<PaymentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
