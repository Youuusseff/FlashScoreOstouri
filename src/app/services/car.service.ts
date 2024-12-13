import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/CarRentalApp/';
  constructor(private http: HttpClient) { }
  getAllCars(){
    return this.http.get(`${this.apiUrl}Getcars`);
  }
  createCar(carObj: any){
    return this.http.post(`${this.apiUrl}CreateNewCar`, carObj);
  }
  updateCar(carObj: any){
    return this.http.put(`${this.apiUrl}UpdateCar`, carObj);
  }
  deleteCar(carId: any){
    return this.http.delete(`${this.apiUrl}DeleteCarbyCarId?carid=${carId}`);
  }
}
