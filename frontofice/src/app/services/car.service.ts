import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CarInterface } from './../interfaces/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) {}

  getAll() {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token || ''
      })
    };
    const url = environment.backbone + '/api/cars';
    return this.http.get<CarInterface[]>(url, httpOptions);
  }
}
