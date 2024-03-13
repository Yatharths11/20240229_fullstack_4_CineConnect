import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
import { Component,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-theaters',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './create-theaters.component.html',
  styleUrls: ['./create-theaters.component.css']
})
export class CreateTheatersComponent {

  theatre: any = {};
  // http: HttpClient = inject(HttpClient)
  token: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVtZXNoIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTAzMzc2NTcsImV4cCI6MTcxMDM3MzY1N30.x1_rREkQpP7Dj_Vj6I--rfTEdfjGNVg4DORbU18Fah4"
  constructor(private http: HttpClient) {}


  createTheatre() {
    // Create JSON object with input data
    const theatreData = {
      name: this.theatre.name,
      location: this.theatre.location,
      screens: this.theatre.screens,
      seats: this.theatre.seats,
      address: this.theatre.address
    };

    // You can now use theatreData object as needed
    console.log('Theatre Data:', theatreData);
    
    const headers = new HttpHeaders().set("authorization", this.token);
    this.http.post("http://localhost:5000/theatre/post", theatreData, { headers })
      .subscribe(
        (response) => {
          console.log(`Status: ${response}`);
        }
      )
    // Reset the form
    this.resetForm();
  }

  resetForm() {
    // Clear the input fields
    this.theatre = {};
  }
}
