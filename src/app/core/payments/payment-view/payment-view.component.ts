import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenService } from 'src/app/shared/services/open.service';
import { Payment } from '../payments.models';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  payment:Payment;

  constructor(
    public openService: OpenService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.initPayment(id);
      }
    )
  }

  initPayment(payment_id: number) {
    this.openService.getUrl(`payments/${payment_id}`)
    .subscribe(
      (payment: Payment) => {
        this.payment = payment;
      },
      error => {
        console.log(error);
      });
  }

}
