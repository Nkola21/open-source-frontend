import { FormBuilder, Validators } from '@angular/forms';

import { newPayment } from './payments.models';

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
            'applicant_id': [details.applicant_id],
            'payment_type': ["", [Validators.required]],
            'end_date': [details.date, [Validators.required]],
            'cover': [{value: details.cover, disabled: true}, [Validators.required]],
            'premium': [{value: details.premium, disabled: true}, [Validators.required]],
            'last_payment': [{value: details.last_payment, disabled: true}, [Validators.required]]
        });
    }
}