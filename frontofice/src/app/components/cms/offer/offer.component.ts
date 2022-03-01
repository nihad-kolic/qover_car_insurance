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
  globalPriceMonthly;
  universalPrice;
  universalPriceMonthly;
  isChecked: boolean = true;
  globalSelected: boolean = true;
  yearlyIncludingTaxesMessage = 'YEARLY INCL. taxes';
  monthlyIncludingTaxesMessage = 'MONTHLY INCL. taxes';
  isCheckedEvent;
  checkValue(e) {
    console.log(e.target.checked);
    this.isChecked = e.target.checked;
    //this.selectedCarId = e.target.value;
  }

  globalPlanSelectionToggle(setFlag){
    this.globalSelected = setFlag;
  }

  ngOnInit(): void {
    this.globalPrice = Number(
      this.route.snapshot.queryParamMap.get('globalPrice')
    ).toFixed(2);
    this.globalPriceMonthly = this.globalPrice / 12;
    this.globalPriceMonthly = this.globalPriceMonthly.toFixed(2);
    this.universalPrice = Number(
      this.route.snapshot.queryParamMap.get('universalPrice')
    ).toFixed(2);
    this.universalPriceMonthly = this.universalPrice / 12;
    this.universalPriceMonthly = this.universalPriceMonthly.toFixed(2);
  }
}
