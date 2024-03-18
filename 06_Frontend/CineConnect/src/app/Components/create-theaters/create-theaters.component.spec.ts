import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTheatersComponent } from './create-theaters.component';

describe('CreateTheatersComponent', () => {
  let component: CreateTheatersComponent;
  let fixture: ComponentFixture<CreateTheatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTheatersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
