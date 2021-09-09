import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Payment, newPayment } from './payments.models';

export class PaymentFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }
  
    buildForm(main_member) {
        return this.buildPaymentForm(main_member);
    }

    buildPaymentForm(details) {
        details = details === undefined ? newPayment() : details;
        return this.formBuilder.group({
            'id': [details.id],
            'date': [details.date, [Validators.required]],
            'applicant_id': [details.applicant_id, [Validators.required]],
            'plan_id': [details.plan_id, [Validators.required]],
            'parlour_id': [details.parlour_id, [Validators.required]]
        });
    }
}