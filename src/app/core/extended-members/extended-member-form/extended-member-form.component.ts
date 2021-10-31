import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { ExtendedMember, newExtendedMember, newApplicant } from './../extended-members.models';
import { ToastrService } from 'ngx-toastr';


export class MainMemberFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(extended_member) {
    return this.buildMainMemberForm(extended_member);
  }

  buildMainMemberForm(details) {
    details = details === undefined ? newExtendedMember() : details;
    return this.formBuilder.group({
      'id': [details.id],
      'first_name': [details.first_name, [Validators.required, Validators.minLength(6)]],
      'last_name': [details.last_name, [Validators.required, Validators.minLength(6)]],
      'number': [details.number],
      'id_number': [details.id_number],
      'type': [details.type, [Validators.required]],
      'date_joined': [details.date_joined, [Validators.required]],
      'date_of_birth': [details.date_of_birth],
      'relation_to_main_member': [details.relation_to_main_member, [Validators.required]]
    });
  }

  buildPlan(details) {
    details = details === undefined ? {'id': null, 'name': null} : details;
    return this.formBuilder.group({
      'id': [details.id],
    });
  }

  buildApplicantForm(details) {
    details = details === undefined ? newApplicant() : details;
    return this.formBuilder.group({
        'id': [details.id],
        'policy_num': [details.policy_num, [Validators.required, Validators.minLength(6)]],
        'document': [details.document, [Validators.required, Validators.minLength(6)]],
        'cancelled': [details.cancelled, [Validators.required]],
        'status': [details.status, [Validators.required]],
        'date': [details.date, [Validators.required]]
    });
  }
}


@Component({
  selector: 'app-extended-member-form',
  templateUrl: './extended-member-form.component.html',
  styleUrls: ['./extended-member-form.component.css']
})
export class ExtendedMemberFormComponent implements OnInit {
  extended_member: any;
  formBuilder: MainMemberFormBuilder;
  form: FormGroup;
  parlour_id: any;
  applicant_id: any;
  user: any;
  plans: Array<any> = [];

  constructor(public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.formBuilder = new MainMemberFormBuilder(fb);
     }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser()
    this.route.params.forEach((params: Params) => {
      const id = +params['id'];
      if (params['id'] !== undefined) {
        this.getExtendedMember(id);
      }else{
        this.initForm(this.extended_member);
      }
      if (params['applicant_id'] !== undefined) {
        const id = +params['applicant_id'];
        this.applicant_id = id
      }
  });
  }

  initForm(extended_member: ExtendedMember) {
    this.extended_member = extended_member;
    this.form = this.formBuilder.buildForm(this.extended_member);
  }

  getExtendedMember(id) {
    this.openService.getOne(`extended-members/${id}/get`)
      .subscribe(
        extended_member => {
          this.extended_member = extended_member;
          this.initForm(this.extended_member);
        },
        error => console.log("ERROR"));
  }

  submit() {
    const formValue = this.form.value;
    formValue["applicant_id"] = this.applicant_id;
    if (formValue['type'] == 0 ) {
      formValue['relation_to_main_member'] = 9;
    }
    console.log(formValue);
    if (this.extended_member) {
      this.openService.put(`extended-members/${this.extended_member.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess()
          },
        error => {
          const description = error.hasOwnProperty('errors') ? this.getErrorDetails(error) : error['description'];
          this.toastr.error(description, error['title'], {timeOut: 3000});
        });
    }else {
      this.openService.post(`extended-members`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess();
          },
        error => {
          const description = error.hasOwnProperty('errors') ? this.getErrorDetails(error) : error['description'];
          this.toastr.error(description, error['title'], {timeOut: 3000});
        });
    }
  }

  showSuccess() {
    this.toastr.success('New Member added successfully!', 'Success!!!');
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  getErrorDetails(error) {
    const body = error.json();
    let dets = '';
    for (const key of Object.keys(body['errors'])) {
      dets += `${key} - ${body['errors'][key]}\n`;
    }
    return dets;
  }

  getAge() {
    if (this.extended_member && this.extended_member.id_number) {
      const year_digits = this.extended_member.id_number.substr(0,2);

      let this_year = new Date().getFullYear().toString().substr(2,3);
      if (year_digits) {
          if (parseInt(year_digits) >= 0 && parseInt(year_digits) < 35) {
            const age = parseInt(this_year) - parseInt(year_digits);
            return age + " years old";
          }
          const year_born = "19" + year_digits;
          this_year = new Date().getFullYear().toString()

          const age = parseInt(this_year) - parseInt(year_born)
          return age + " years old";
      }
    }
    return null;
  }
}
