import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { PaymentFormBuilder } from '../payment-form-builder';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  payment: any;
  formBuilder: PaymentFormBuilder;
  form: FormGroup;
  last_payment: any;
  main_member: any;
  parlour_id: any;
  user: any;

  constructor(
    public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.formBuilder = new PaymentFormBuilder(fb);
  }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser();
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        const applicant_id = +params['applicant_id'];
        if (id){
          // this.getMainMember(id);
        }else if (applicant_id){
          this.getMainMember(applicant_id);
        }else {
          this.initForm(this.payment);
        }
      }
    )
    
  }

  initForm(payment) {
    this.payment = payment;
    this.form = this.formBuilder.buildForm(this.payment);
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  // initPayment(id) {
  //   this.openService.getOne(`payments`)
  //     .subscribe(
  //       payment => {
  //         this.last_payment = payment
  //         this.initForm(this.payment);
  //       },
  //       error => console.log(error));
  // }

  getMainMember(id) {
    this.openService.getOne(`main-members/${id}/get`)
      .subscribe(
        main_member => {
          console.log("Main member: ", main_member)
          this.main_member = main_member;
          this.getPreviousPayment(main_member);
        },
        error => console.log(error));
  }

  getPreviousPayment(main_member) {
    this.openService.getOne(`applicants/${main_member.applicant.id}/payments/last`)
      .subscribe(
        last_payment => {
          this.last_payment = last_payment;
          console.log("Payment", last_payment);
          const payment = {
            "applicant_id": main_member.applicant.id,
            "cover": main_member.applicant.plan.cover,
            "premium": main_member.applicant.plan.premium,
            "date": new Date(),
            "last_payment": new Date(this.last_payment.created).toDateString()
          }
          this.initForm(payment);
        },
        error => console.log(error));
  }

  submit() {
    const formValue = this.form.value;
    formValue['date'] = new Date(formValue['date'])
    formValue['end_date'] = new Date(formValue['end_date'])
    formValue["user"] = this.user;
    console.log(formValue['date'])
    this.openService.post(`parlours/${this.parlour_id}/payments`, formValue)
      .subscribe(
        (payment: any) => {
          this.showSuccess();
        },
      error => {
        this.toastr.error(error["description"], error['title'], {timeOut: 3000});
      });
  }

  showSuccess() {
    this.toastr.success('New Plan saved successfully!', 'Success!!!');
  }

  showError(error) {
    let errors = {};
    errors = error.json();
    const description = errors.hasOwnProperty('errors') ? this.getErrorDetails(error) : errors['description'];
    this.toastr.error(description, errors['title'], {timeOut: 3000});
    // this.toastr.error('Error', 'Major Error', {
    //   timeOut: 3000,
    // });
  }

  getErrorDetails(error) {
    const body = error.json();
    let dets = '';
    for (const key of Object.keys(body['errors'])) {
      dets += `${key} - ${body['errors'][key]}\n`;
    }
    return dets;
  }
}
