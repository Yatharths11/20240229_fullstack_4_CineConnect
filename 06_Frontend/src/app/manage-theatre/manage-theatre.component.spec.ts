import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTheatreComponent } from './manage-theatre.component';

describe('ManageTheatreComponent', () => {
  let component: ManageTheatreComponent;
  let fixture: ComponentFixture<ManageTheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTheatreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
