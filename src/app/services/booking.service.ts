import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/CarRentalApp/';
  constructor(private http: HttpClient) { }
  getAllBookings(){
    return this.http.get(`${this.apiUrl}geAllBookings`);
  }
  getBookingById(id: any){
    return this.http.get(`${this.apiUrl}GetBookingByBookingId?bookingId=${id}`);
  }
  createBooking(bookingObj: any){
    return this.http.post(`${this.apiUrl}CreateNewBooking`, bookingObj);
  }
  deleteBooking(id: any){
    return this.http.delete(`${this.apiUrl}DeletBookingById?id=${id}`);
  }
}
