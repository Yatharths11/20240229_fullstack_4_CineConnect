import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSeatBookComponentComponent } from './movie-seat-book-component.component';

describe('MovieSeatBookComponentComponent', () => {
  let component: MovieSeatBookComponentComponent;
  let fixture: ComponentFixture<MovieSeatBookComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSeatBookComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSeatBookComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
