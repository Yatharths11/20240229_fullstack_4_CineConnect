import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateShowComponent } from './admin-create-show.component';

describe('AdminCreateShowComponent', () => {
  let component: AdminCreateShowComponent;
  let fixture: ComponentFixture<AdminCreateShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCreateShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
