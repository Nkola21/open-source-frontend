import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MainMember, newMainMember } from './../main-members.models';

export class MainMemberFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }
  
    buildForm(main_member) {
        return this.buildMainMemberForm(main_member);
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
}