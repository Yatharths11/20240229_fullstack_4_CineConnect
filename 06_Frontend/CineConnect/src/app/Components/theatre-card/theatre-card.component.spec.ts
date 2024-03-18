import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreCardComponent } from './theatre-card.component';

describe('TheatreCardComponent', () => {
  let component: TheatreCardComponent;
  let fixture: ComponentFixture<TheatreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheatreCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheatreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
