import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { newApplicant, newMainMember, newDependant,
    newExtendedMember, newAdditionalExtendedMember 
} from './../applicant.model';
import {  } from './../../main-members/main-member-form/main-member-form-builder';



export class ApplicantFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }

    buildForm(main_member) {
        return this.buildApplicantForm(main_member);
    }

    buildApplicantForm(details) {
        details = details === undefined ? newApplicant() : details;
        return this.formBuilder.group({
            'id': [details.id],
            'policy_num': [details.policy_num, [Validators.required, Validators.minLength(6)]],
            'document': [details.document, [Validators.required, Validators.minLength(6)]],
            'cancelled': [details.cancelled, [Validators.required]],
            'status': [details.status, [Validators.required]],
            'date': [details.date, [Validators.required]],
            'main_member': [this.buildMainMemberForm(details.main_member)],
            'dependant': [this.buildDependantForm(details.dependants)],
            'extended_member': [this.buildExtendedMemberForm(details.extended_members)],
            'additional_extended_member': [this.buildAdditionalExtendedMemberForm(details.additional_extended_members)]
        });
    }

    buildMainMemberForm(details) {
        details = details === undefined ? newMainMember() : details;
        return this.formBuilder.group({
            'id': [details.id],
            'first_name': [details.first_name, [Validators.required, Validators.minLength(6)]],
            'last_name': [details.last_name, [Validators.required, Validators.minLength(6)]],
            'id_number': [details.id_number, [Validators.required]],
            'date_joined': [details.date_joined, [Validators.required]],
            'contact': [details.contact, [Validators.required]]
        });
    }

    buildDependantForm(details) {
        details = details === undefined ? newDependant() : details;
        return this.formBuilder.group({
            'id': [details.id],
            'first_name': [details.first_name, [Validators.required, Validators.minLength(6)]],
            'last_name': [details.last_name, [Validators.required, Validators.minLength(6)]],
            'id_number': [details.id_number, [Validators.required]],
            'date_joined': [details.date_joined, [Validators.required]],
            'contact': [details.contact, [Validators.required]]
        });
    }

    buildExtendedMemberForm(details) {
        details = details === undefined ? newExtendedMember() : details;
        return this.formBuilder.group({
            'id': [details.id],
            'first_name': [details.first_name, [Validators.required, Validators.minLength(6)]],
            'last_name': [details.last_name, [Validators.required, Validators.minLength(6)]],
            'id_number': [details.id_number, [Validators.required]],
            'date_joined': [details.date_joined, [Validators.required]],
            'contact': [details.contact, [Validators.required]]
        });
    }

    buildAdditionalExtendedMemberForm(details) {
        details = details === undefined ? newAdditionalExtendedMember() : details;
        return this.formBuilder.group({
            'id': [details.id],
            'first_name': [details.first_name, [Validators.required, Validators.minLength(6)]],
            'last_name': [details.last_name, [Validators.required, Validators.minLength(6)]],
            'id_number': [details.id_number, [Validators.required]],
            'date_joined': [details.date_joined, [Validators.required]],
            'contact': [details.contact, [Validators.required]]
        });
    }
}
