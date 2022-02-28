import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private http: HttpClient) {}

  getOffer(data) {
    const token = localStorage.getItem('accessToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token || ''
      })
    };
    const url = `${environment.backbone}/api/cars/${data.carId}/offer?age=${data.age}&price=${data.price}`;
    return this.http.get(url, httpOptions);
  }
}
