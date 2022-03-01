import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { CarInterface } from './../../../interfaces/car.interface';
import { OfferService } from '../../../services/offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  constructor(
    private car: CarService,
    private offer: OfferService,
    private router: Router
  ) {}
  selected = '---Car---';
  selectedCarId;
  update(e) {
    console.log(e.target.value);
    this.selectedCarId = e.target.value;
  }
  cars: Array<CarInterface> = [];

  carPriceForm = new FormGroup({
    age: new FormControl('', [this.minValueAge]),
    price: new FormControl('', [this.minValuePrice])
  });

  ngOnInit(): void {
    this.getCars();
  }

  get ageValid() {
    return this.carPriceForm.get('age');
  }

  get priceValid() {
    return this.carPriceForm.get('price');
  }

  getCars() {
    this.car.getAll().subscribe({
      next: (res: CarInterface[]) => {
        if (res) {
          console.log('CARS: ', res);
          console.log('CARS: ', typeof res);
          this.cars = res;
        }
      },
      error: (err) => {
        console.log(err);
        alert(JSON.stringify(err.error.message));
      }
    });
  }

  onSubmit(): void {
    this.offer
      .getOffer({
        age: this.carPriceForm.value.age,
        price: this.carPriceForm.value.price,
        carId: this.selectedCarId
      })
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.router.navigate(['/cms/offer'], { queryParams: res });
          }
        },
        error: (err) => {
          console.log(err);
          alert(JSON.stringify(err.error.message));
        }
      });
  }

  minValueAge(control: AbstractControl): { [key: string]: any } | null {
    if (Number(control.value) < 18) {
      return { ageMin: { value: control.value } };
    } else {
      return null;
    }
  }

  minValuePrice(control: AbstractControl): { [key: string]: any } | null {
    if (Number(control.value) < 5000) {
      return { priceMin: { value: control.value } };
    } else {
      return null;
    }
  }
}
