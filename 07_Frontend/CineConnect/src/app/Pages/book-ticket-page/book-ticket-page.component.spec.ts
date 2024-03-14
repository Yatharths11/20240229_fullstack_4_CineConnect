import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketPageComponent } from './book-ticket-page.component';

describe('BookTicketPageComponent', () => {
  let component: BookTicketPageComponent;
  let fixture: ComponentFixture<BookTicketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTicketPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookTicketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
