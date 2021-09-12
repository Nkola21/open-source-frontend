import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Payment, newPayment } from './payments.models';

export class PaymentFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }
  
    buildForm(payment) {
        return this.buildPaymentForm(payment);
    }

    buildPaymentForm(details) {
        details = details === undefined ? newPayment() : details;
        return this.formBuilder.group({
            'date': [details.date, [Validators.required]],
            'applicant_id': [details.applicant_id, [Validators.required]],
            'cover': [details.cover, [Validators.required]],
            'premium': [details.premium, [Validators.required]],
            'last_payment': [details.last_payment, [Validators.required]]
        });
    }
}