import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../payment.service';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-seat-booking',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-seat-book-component.component.html',
  styleUrl: './movie-seat-book-component.component.css',
})
export class MovieSeatBookComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {}
  movie: any;
  @Input() bookedTickets: any[] = [{}];

  movieList: any = {
    movieName: '',
    ticketRate: '250',
    currency: 'INR',
    movieBanner: '',
    description: '',
    shows: [],
    seatRows: [
      { row: 'A', noOfSeats: 8 },
      { row: 'b', noOfSeats: 7 },
      { row: 'c', noOfSeats: 6 },
      { row: 'd', noOfSeats: 8 },
      { row: 'e', noOfSeats: 8 },
      { row: 'f', noOfSeats: 8 },
    ],
  };

  ngOnInit(): void {
    this.movie = history.state.movie;
    if (this.movie) {
      this.movieList.movieName = this.movie.name;
      this.movieList.movieBanner = this.movie.imageUrl;
      this.movieList.description = this.movie.description;
    }
  }

  totalPrice: number = 0;
  bookedSeatNo: any[] = [];

  getSeatArray(totalSeats: number) {
    let arrayOfSeats = [];
    for (let index = 0; index < totalSeats; index++) {
      arrayOfSeats.push(index);
    }
    return arrayOfSeats;
  }

  bookSeat(rowNo: string, seatNo: number) {
    const isBooked = this.bookedSeatNo.find(
      (m) => m.row == rowNo && m.seat == seatNo
    );

    if (isBooked === undefined && !this.checkIfPrevOccupied(rowNo, seatNo)) {
      let seatObj = { row: rowNo, seat: seatNo };
      this.bookedSeatNo.push(seatObj);
    } else if (isBooked !== undefined) {
      const indexToDelete = this.bookedSeatNo.findIndex(
        (m) => m.row == rowNo && m.seat == seatNo
      );
      this.bookedSeatNo.splice(indexToDelete, 1);
    }

    console.log(this.bookedSeatNo);
  }

  checkIfOccupied(rowNo: string, seatNo: number) {
    let seatObj = { row: rowNo, seat: seatNo };
    const isBooked = this.bookedSeatNo.find(
      (m) => m.row == rowNo && m.seat == seatNo
    );
    if (isBooked === undefined) {
      return false;
    }
    return true;
  }

  checkIfPrevOccupied(rowNo: string, seatNo: number) {
    let seatObj = { row: rowNo, seat: seatNo };
    const isBooked = this.bookedTickets.find(
      (m) => m.row == rowNo && m.seat == seatNo
    );
    if (isBooked === undefined) {
      return false;
    }
    return true;
  }

  getPrice() {
    this.totalPrice = this.movieList.ticketRate * this.bookedSeatNo.length;
    this.paymentService.updateTotalPrice(this.totalPrice);

    return this.totalPrice; // Emit the updated total price
  }
}
