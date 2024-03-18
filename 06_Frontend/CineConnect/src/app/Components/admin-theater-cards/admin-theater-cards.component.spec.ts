import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTheaterCardsComponent } from './admin-theater-cards.component';

describe('AdminTheaterCardsComponent', () => {
  let component: AdminTheaterCardsComponent;
  let fixture: ComponentFixture<AdminTheaterCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTheaterCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTheaterCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
