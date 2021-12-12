import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ExtendedMember, newExtendedMember, newApplicant } from './../extended-members.models';
import { ToastrService } from 'ngx-toastr';
import { CompareFormValue } from './../../../shared/utils'


export class ExtendedMemberFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(extended_member) {
    return this.buildExtendedMemberForm(extended_member);
  }

  buildExtendedMemberForm(details) {
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


const relation_types = {
  0: 'Spouse',
  1: 'Dependant',
  2: 'Extended Member',
  3: 'Additional Extended Member',
  4: 'Select Member Type'
}


const relationships = {
  0: 'Child',
  1: 'Parent',
  2: 'Brother',
  3: 'Sister',
  4: 'Nephew',
  5: 'Niece',
  6: 'Aunt',
  7: 'Uncle',
  8: 'Grand Parent',
  9: 'Wife',
  10: 'Husband',
  11: 'Cousin',
  12: 'Relationship to Main Member'
}

@Component({
  selector: 'app-extended-member-form',
  templateUrl: './extended-member-form.component.html',
  styleUrls: ['./extended-member-form.component.css']
})
export class ExtendedMemberFormComponent extends CompareFormValue implements OnInit {
  extended_member: any;
  formBuilder: ExtendedMemberFormBuilder;
  form: FormGroup;
  parlour_id: any;
  applicant_id: any;
  user: any;
  plans: Array<any> = [];
  applicant: any;
  plan: any;
  typeSelected: any;
  relationshipSelected: any;
  relation_types: Array<any> = [];
  relationships: Array<any> = [];

  constructor(public openService: OpenService,
    public service: CommonService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      super();
      this.formBuilder = new ExtendedMemberFormBuilder(fb);
     }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser()
    this.transition(this.user);
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

  transition(user: any) {
    this.service.switchHeader(user);
  }

  initTypes() {
    this.relation_types = [
        {"id": 0, "name": relation_types[0]},
        {"id": 1, "name": relation_types[1]},
        {"id": 2, "name": relation_types[2]},
        {"id": 3, "name": relation_types[3]},
        {"id": 4, "name": relation_types[4]},
    ]

    if (this.extended_member) {
      this.typeSelected = this.extended_member.type;
    } else {
      this.typeSelected = 4;
    }
  }

  initRelationships() {
    this.relationships = [
        {"id": 0, "name": relationships[0]},
        {"id": 1, "name": relationships[1]},
        {"id": 2, "name": relationships[2]},
        {"id": 3, "name": relationships[3]},
        {"id": 4, "name": relationships[4]},
        {"id": 5, "name": relationships[5]},
        {"id": 6, "name": relationships[6]},
        {"id": 7, "name": relationships[7]},
        {"id": 8, "name": relationships[8]},
        {"id": 9, "name": relationships[9]},
        {"id": 10, "name": relationships[10]},
        {"id": 11, "name": relationships[11]},
        {"id": 12, "name": relationships[12]},
    ]

    if (this.extended_member) {
      this.relationshipSelected = this.extended_member.relation_to_main_member;
    } else {
      this.relationshipSelected = 12;
    }
  }
  
  initForm(extended_member: ExtendedMember) {
    this.extended_member = extended_member;
    this.form = this.formBuilder.buildForm(this.extended_member);

    this.form.controls.id_number.valueChanges.subscribe(val => {
      if (val) {
        this.disableFormElement('date_of_birth');
        const dob = document.getElementById('dob_picker');
        dob.setAttribute("disable", "true");
      }else {
        this.enableFormElement('date_of_birth');
        this.enableFormElement('dob_picker');
      }
    });
    this.initTypes();
    this.initRelationships();
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

  getApplicant(id) {
    this.openService.getOne(`applicant/${id}/get`)
      .subscribe(
        applicant => {
          this.applicant = applicant;
        },
        error => console.log("ERROR"));
  }

  getPlan(id) {
    this.openService.getOne(`plans/${id}/get`)
      .subscribe(
        plan => {
          this.plan = plan;
        },
        error => console.log("ERROR"));
  }

  submit() {
    const formValue = this.form.value;
    formValue["applicant_id"] = this.applicant_id;

    if (this.extended_member) {
      this.openService.put(`extended-members/${this.extended_member.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess()
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
    }else {
      this.openService.post(`extended-members`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess();
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
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
          if (parseInt(year_digits) >= 0 && parseInt(year_digits) < 28) {
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

  isAgeLimitExceeded() {
    const formValue = this.form.value;

    let queryString = `type=${formValue['type']}`
    if (formValue['id_number']) {
      queryString += `&id_number=${formValue['id_number']}`
    }
    if (formValue['date_of_birth']) {
      const dob = new Date(formValue['date_of_birth']).toISOString();
      queryString += `&date_of_birth=${dob}`
    }
    this.openService.getUrl(`applicants/${this.applicant_id}/extended-members/age-limit?${queryString}`)
        .subscribe(
          (res: any) => {
            if (res['result'] != 'OK!') {
              let btn = document.getElementById("ageExceededModal");
              btn.click();
            }else{
              this.submit();
            }
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  onTypeSelected(event){
    this.typeSelected =  event;
  }

  onRelationshipSelected(event){
    this.relationshipSelected =  event;
  }
}
