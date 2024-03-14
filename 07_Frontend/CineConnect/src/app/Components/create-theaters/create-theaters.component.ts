import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component,NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-create-theaters',
  standalone:true,
  imports:[CommonModule,FormsModule,HttpClientModule],
  templateUrl: './create-theaters.component.html',
  styleUrls: ['./create-theaters.component.css']
})
export class CreateTheatersComponent {

  theatre: any = {
    name: '',
    address: {
      street: '',
      area: '',
      city: ''
    }
  };

  isEditing: boolean = false;
  theaterId: string = ''; // Holds the theater ID when editing
  token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEwMzkyMTA0LCJleHAiOjE3MTA0MjgxMDR9.u1sNpr3Lkw_aqFrS1H27iFJHGyhrTOGvfBpG_lp1jkg";

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check if there's a theater ID in the route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditing = true;
        this.theaterId = params['id'];
        // Load theater details when editing
        this.loadTheaterDetails(this.theaterId);
      }
    });
  }
  
  

  loadTheaterDetails(theaterId: string) {
    const headers = new HttpHeaders().set("authorization", this.token);
    this.http.get(`http://localhost:5000/theatres/${theaterId}`, { headers })
      .subscribe(
        (response: any) => {
          this.theatre = response; // Populate form with theater details
        }
      );
  }

  submitForm() {
    const theaterData = {
      name: this.theatre.name,
      address: {
        street: this.theatre.street,
        area: this.theatre.area,
        city: this.theatre.city
      }
    };

    if (this.isEditing) {
      this.updateTheatre(theaterData);
    } else {
      this.createTheatre(theaterData);
    }
  }

  createTheatre(theaterData: any) {
    const headers = new HttpHeaders().set("authorization", this.token);
    this.http.post("http://localhost:5000/theatres/post", theaterData, { headers })
      .subscribe(
        (response) => {
          console.log(`Theater created. Status: ${response}`);

          this.resetForm();
        },
      );
  }

  updateTheatre(theaterData: any) {
    const headers = new HttpHeaders().set("authorization", this.token);
    this.http.put(`http://localhost:5000/theatres/${this.theaterId}`, theaterData, { headers })
      .subscribe(
        (response) => {
          console.log(`Theater updated. Status: ${response}`);
          this.resetForm();
        },
        (error) => {
          console.error('Error updating theater:', error);
        }
      );
  }

  resetForm() {
    // Clear the input fields
    this.theatre = {
      name: '',
      address: {
        street: '',
        area: '',
        city: ''
      }
    };
  }
}
