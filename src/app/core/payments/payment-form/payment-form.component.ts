import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
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
  applicant_id: any;
  user: any;

  constructor(
    public openService: OpenService,
    public service: CommonService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.formBuilder = new PaymentFormBuilder(fb);
  }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser();
    this.transition(this.user);
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        const applicant_id = +params['applicant_id'];
        this.applicant_id = applicant_id;
        if (id){
        }else if (applicant_id){
          this.getMainMember(applicant_id);
        }else {
          this.initForm(this.payment);
        }
      }
    )
    
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  initForm(payment) {
    this.payment = payment;
    this.form = this.formBuilder.buildForm(this.payment);
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  getMainMember(id) {
    this.openService.getOne(`main-members/${id}/get`)
      .subscribe(
        main_member => {
          this.main_member = main_member;
          this.getPreviousPayment(main_member);
        },
        error => {
          const err = error["error"]
          this.toastr.error(err["description"], err['title'], {timeOut: 3000});
        });
  }

  getPreviousPayment(main_member) {
    this.openService.getOne(`applicants/${main_member.applicant.id}/payments/last`)
      .subscribe(
        last_payment => {
          this.last_payment = last_payment;

          const payment = {
            "applicant_id": main_member.applicant.id,
            "cover": main_member.applicant.plan.cover,
            "premium": main_member.applicant.plan.premium,
            "date": new Date(),
            "last_payment": new Date(this.last_payment.created).toDateString()
          }

          this.initForm(payment);
        },
        error =>  {
          const err = error["error"]
          this.toastr.error(err["description"], err['title'], {timeOut: 3000});
        });
  }

  submit() {
    const formValue = this.form.value;
    const start_date = new Date(formValue['date'])
    const end_date = new Date(formValue['end_date'])

    formValue['date'] = moment(start_date).format('DD/MM/YYYY');
    formValue['end_date'] = moment(end_date).format('DD/MM/YYYY');
    formValue["user"] = this.user;

    this.openService.post(`parlours/${this.parlour_id}/payments`, formValue)
      .subscribe(
        (invoice: any) => {
          this.showSuccess();
          console.log(invoice);
          this.getReceipt(invoice.id);
        },
      error => {
        const err = error["error"]
        this.toastr.error(err["description"], err['title'], {timeOut: 3000});
      });
  }

  showSuccess() {
    this.toastr.success('Payment saved successfully!', 'Success!!!');
  }

  getReceipt(id) {
    const base_url = this.openService.getBaseUrl()
    const anchor = <HTMLAnchorElement>document.getElementById('printInvoice');
    anchor.href = `${base_url}/invoices/${id}`;
    anchor.click();
  }
}
