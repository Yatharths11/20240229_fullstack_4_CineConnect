import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftSidebarComponent } from './admin-left-sidebar.component';

describe('AdminLeftSidebarComponent', () => {
  let component: AdminLeftSidebarComponent;
  let fixture: ComponentFixture<AdminLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLeftSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
