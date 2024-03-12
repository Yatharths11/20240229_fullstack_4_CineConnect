import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieCardsComponent } from './admin-movie-cards.component';

describe('AdminMovieCardsComponent', () => {
  let component: AdminMovieCardsComponent;
  let fixture: ComponentFixture<AdminMovieCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMovieCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMovieCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
