import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenService } from 'src/app/shared/services/open.service';
import { MainMember, newMainMember } from './../main-members.models';

export class MainMemberFormBuilder {
  constructor(private formBuilder: FormBuilder) {
  }

  buildForm(parlour) {
    return this.buildConsultantForm(parlour);
  }

  buildConsultantForm(details) {
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


@Component({
  selector: 'app-main-member-form',
  templateUrl: './main-member-form.component.html',
  styleUrls: ['./main-member-form.component.css']
})
export class MainMemberFormComponent implements OnInit  {
  main_member: any;
  formBuilder: MainMemberFormBuilder;
  form: FormGroup;

  constructor(public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder) {
      this.formBuilder = new MainMemberFormBuilder(fb);
     }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id){
          this.getMainMember(id);
        }else{
          this.initForm(this.main_member);
        }
      }
    )
  }

  initForm(main_member: MainMember) {
    this.main_member = main_member;
    this.form = this.formBuilder.buildForm(this.main_member);
  }

  getMainMember(id) {
    this.openService.getOne(`main-members/${id}/get`)
      .subscribe(
        main_member => {
          console.log("Main member: ", main_member);
          this.main_member = main_member;
          this.initForm(this.main_member);
        },
        error => console.log("ERROR"));
  }

  submit() {
    const formValue = this.form.value;
    console.log(formValue);
    if (this.main_member) {
      this.openService.put(`main-members/${this.main_member.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            
          },
        error => {
            console.log(error);
        });
    }else {
      this.openService.post(`main-members`, formValue)
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
    const year_digits = this.main_member.id_number ? this.main_member.id_number.substr(0,2) : null;

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
