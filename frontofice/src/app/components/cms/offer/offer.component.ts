import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  globalPrice;
  globalPriceParsed;
  globalPriceMonthly;
  globalPriceMonthlyParsed;
  universalPrice;
  universalPriceParsed;
  universalPriceMonthly;
  universalPriceMonthlyParsed;
  isChecked: boolean = true;
  globalSelected: boolean = true;
  yearlyIncludingTaxesMessage = 'YEARLY INCL. taxes';
  monthlyIncludingTaxesMessage = 'MONTHLY INCL. taxes';
  isCheckedEvent;
  checkValue(e) {
    this.isChecked = e.target.checked;
    //this.selectedCarId = e.target.value;
  }

  globalPlanSelectionToggle(setFlag) {
    this.globalSelected = setFlag;
  }

  ngOnInit(): void {
    this.globalPrice = Number(
      this.route.snapshot.queryParamMap.get('globalPrice')
    );
    this.globalPriceParsed = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(this.globalPrice);
    this.globalPriceMonthly = this.globalPrice / 12;
    this.globalPriceMonthlyParsed = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(this.globalPriceMonthly);
    this.universalPrice = Number(
      this.route.snapshot.queryParamMap.get('universalPrice')
    );
    this.universalPriceParsed = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(this.universalPrice);
    this.universalPriceMonthly = this.universalPrice / 12;
    this.universalPriceMonthlyParsed = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(this.universalPriceMonthly);
  }
}
