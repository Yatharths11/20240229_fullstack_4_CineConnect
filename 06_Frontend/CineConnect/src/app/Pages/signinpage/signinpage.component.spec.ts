import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninpageComponent } from './signinpage.component';

describe('SigninpageComponent', () => {
  let component: SigninpageComponent;
  let fixture: ComponentFixture<SigninpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});