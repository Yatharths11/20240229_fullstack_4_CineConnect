import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShowsComponent } from './manage-shows.component';

describe('ManageShowsComponent', () => {
  let component: ManageShowsComponent;
  let fixture: ComponentFixture<ManageShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageShowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
