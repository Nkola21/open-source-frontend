import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { Applicant, newApplicant } from './../applicant.model';


export class ApplicantFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(applicant) {
    return this.buildApplicantForm(applicant);
  }

  buildApplicantForm(details) {
    details = details === undefined ? newApplicant() : details;
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


@Component({
  selector: 'app-applcant-form',
  templateUrl: './applcant-form.component.html',
  styleUrls: ['./applcant-form.component.css']
})
export class ApplicantFormComponent implements OnInit  {
  applicant: any;
  formBuilder: ApplicantFormBuilder;
  form: FormGroup;

  constructor(public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder) {
      this.formBuilder = new ApplicantFormBuilder(fb);
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id){
          this.getApplicant(id);
        }else{
          this.initForm(this.applicant);
        }
      }
    )
  }

  initForm(applicant: Applicant) {
    this.applicant = applicant;
    this.form = this.formBuilder.buildForm(this.applicant);
  }

  getApplicant(id) {
    this.openService.getOne(`applicants/${id}/get`)
      .subscribe(
        applicant => {
          console.log("Main member: ", applicant);
          this.applicant = applicant;
          this.initForm(this.applicant);
        },
        error => console.log("ERROR"));
  }

  submit() {
    const formValue = this.form.value;
    console.log(formValue);
    if (this.applicant) {
      this.openService.put(`applicants/${this.applicant.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            
          },
        error => {
            console.log(error);
        });
    }else {
      this.openService.post(`applicants`, formValue)
        .subscribe(
          (user: any) => {

          },
        error => {
            console.log(error);
        });
    }
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  getAge() {
    const year_digits = this.applicant.id_number ? this.applicant.id_number.substr(0,2) : null;

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
    return null;
  }

}
