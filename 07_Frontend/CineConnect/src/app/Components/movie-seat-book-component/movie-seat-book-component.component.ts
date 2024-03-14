import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-seat-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-seat-book-component.component.html',
  styleUrl: './movie-seat-book-component.component.css'
})
export class MovieSeatBookComponent {

  @Input() bookedTickets:any[]=[
    {

    }
  ]

  

movieList: any={
  movieName:"X-Men",
  ticketRate:"250",
  movieBanner: "../../assets/movie1.jpg",
  description:"lkas;dkfhn;andsfk;jandf;knasdf",
  shows:[],
  seatRows:[
    {row:'A',noOfSeats: 8},
    {row:'b',noOfSeats: 8},
    {row:'c',noOfSeats: 9},
    {row:'d',noOfSeats: 8},
    {row:'e',noOfSeats: 8},
    {row:'f',noOfSeats: 8},
  ]
}


bookedSeatNo:any[]=[]

getSeatArray(totalSeats:number){
  let arrayOfSeats=[]
  for (let index = 0; index < totalSeats; index++) {
   arrayOfSeats.push(index);
  }
  return arrayOfSeats
} 

bookSeat(rowNo:string,seatNo:number){
  const isBooked= this.bookedSeatNo.find(m=>m.row==rowNo && m.seat==seatNo)

  if(isBooked===undefined && !this.checkIfPrevOccupied(rowNo,seatNo)){
  let seatObj= {row:rowNo,seat:seatNo}
  this.bookedSeatNo.push(seatObj)
  }else if(isBooked!==undefined){
    const indexToDelete=this.bookedSeatNo.findIndex(m=>m.row==rowNo && m.seat==seatNo)
    this.bookedSeatNo.splice(indexToDelete,1)
  }

  console.log(this.bookedSeatNo)
  
}

checkIfOccupied(rowNo:string,seatNo:number){
  let seatObj= {row:rowNo,seat:seatNo}
  const isBooked= this.bookedSeatNo.find(m=>m.row==rowNo && m.seat==seatNo)
  if(isBooked===undefined){
  return false
  }
  return true
}

checkIfPrevOccupied(rowNo:string,seatNo:number){
  let seatObj= {row:rowNo,seat:seatNo}
  const isBooked= this.bookedTickets.find(m=>m.row==rowNo && m.seat==seatNo)
  if(isBooked===undefined){
  return false
  }
  return true
}

getPrice(){
  return this.movieList.ticketRate*this.bookedSeatNo.length
}





}
