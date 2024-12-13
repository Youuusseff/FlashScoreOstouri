import { Component, Inject, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { get } from 'http';
import { DatePipe } from '@angular/common';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, DatePipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  bookingList: any[] = [];
  carsList: any[] = [];

  bookingForm : FormGroup = new FormGroup({
    bookingId: new FormControl(0),
    CustomerName: new FormControl(''),
    CustomerCity: new FormControl(''),
    MobileNo: new FormControl(''),
    Email: new FormControl(''),
    CarId: new FormControl(''),
    BookingDate: new FormControl(''),
    Discount: new FormControl(''),
    TotalBillAmount: new FormControl(''),});

  constructor(@Inject(BookingService) private bookingService : BookingService , @Inject(MatSnackBar) private snackBar: MatSnackBar , @Inject(CarService) private carService: CarService) { }
  ngOnInit(): void {
    this.getBookings();
    this.getAllCars();
  }
  getBookings(){
    this.bookingService.getAllBookings().subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        this.bookingService.getBookingById(res.data[i]['bookingId']).subscribe((res: any) => {
          this.bookingList.push(res.data);
        })
      }
    })
  }

  onDelete(id: any){
    this.bookingService.deleteBooking(id).subscribe((res: any) => {
      this.bookingList = this.bookingList.filter((booking) => booking.bookingId != id);
      this.snackBar.open('Booking deleted with success', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });

    })
  }
  onAdd(){
    this.bookingService.createBooking(this.bookingForm.value).subscribe((res: any) => {
      this.getBookings();
      this.snackBar.open('Booking added with success', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    })
  }
  addNew(){
    this.bookingForm.reset();
  }
  onClear(){
    this.bookingForm.reset();
  }
  getAllCars(){
    this.carService.getAllCars().subscribe((res: any) => {
      this.carsList = res.data;
  })}

}
