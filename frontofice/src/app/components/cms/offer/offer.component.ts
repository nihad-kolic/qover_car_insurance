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
  universalPrice;
  ngOnInit(): void {
    this.globalPrice = Number(this.route.snapshot.queryParamMap.get('globalPrice'));
    this.universalPrice = Number(this.route.snapshot.queryParamMap.get('universalPrice'));
  }
}
