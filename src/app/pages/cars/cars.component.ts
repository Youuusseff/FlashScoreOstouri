import { Component, OnInit, Inject, model } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  carsList: any[] = [];
  carForm : FormGroup = new FormGroup({

    carId: new FormControl(0),
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    dailyRate: new FormControl(''),
    color: new FormControl(''),
    carImage: new FormControl(''),
    regNo: new FormControl(''),
  });
  constructor(@Inject(CarService) private carService: CarService, @Inject(Router) private router: Router, @Inject(MatSnackBar) private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCars()
  }
  getCars(){
    this.carService.getAllCars().subscribe((res: any) => {
      this.carsList = res.data;
    })
  }
  onDelete(id: any){
    this.carService.deleteCar(id).subscribe((res: any) => {
      this.carsList = this.carsList.filter((car) => car.carId != id);
      this.snackBar.open('Car deleted with success', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    })
  }
  onAdd(){
    this.carService.createCar(this.carForm.value).subscribe((res: any) => {
      this.getCars();
      this.snackBar.open('Car added with success', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    })
    }
  onEdit(car: any){
    this.carForm.patchValue(car);
  }
  addNew(){
    this.carForm.reset();
    this.carForm.value.carId = 0;
  } 
  onUpdate(){
    this.carService.updateCar(this.carForm.value).subscribe((res: any) => {
      this.getCars();
      this.snackBar.open('Car updated with success', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    })}
}

