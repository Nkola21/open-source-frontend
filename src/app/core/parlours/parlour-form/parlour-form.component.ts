  import { Component, OnInit, AfterViewInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { OpenService } from 'src/app/shared/services/open.service';
  import { newParlour, Parlour } from './../parlours.models';
  import { ToastrService } from 'ngx-toastr';
  
  
  export class ParlourFormBuilder {
    constructor(private formBuilder: FormBuilder) {
    }
  
    buildForm(parlour) {
      return this.buildParlourForm(parlour);
    }
  
    buildParlourForm(details) {
      details = details === undefined ? newParlour() : details;
      return this.formBuilder.group({
        'id': [details.id],
        'parlour_name': [details.parlour_name, [Validators.required, Validators.minLength(6)]],
        'person_name': [details.person_name, [Validators.required, Validators.minLength(6)]],
        'address': [details.address, [Validators.required]],
        'email': [details.email, [Validators.required]],
        'number': [details.number, [Validators.required]]
      });
    }
  
  }


@Component({
  selector: 'app-parlour-form',
  templateUrl: './parlour-form.component.html',
  styleUrls: ['./parlour-form.component.css']
})
export class ParlourFormComponent implements OnInit  {
  parlour: any;
  submitted = false;
  formBuilder: ParlourFormBuilder;
  form: FormGroup;
  parlour_id: any;
  user: any;

  constructor(public openService: OpenService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
      this.formBuilder = new ParlourFormBuilder(fb);
      }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser()
    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        if (id){
          this.getParlour(id);
        }else{
          this.initForm(this.parlour);
        }
      }
    )
  }

  initForm(parlour: Parlour) {
    this.parlour = parlour;
    this.form = this.formBuilder.buildForm(this.parlour);
  }

  getParlour(id) {
    console.log("get parlour");
    this.openService.getOne(`parlours/${id}`)
      .subscribe(
        parlour => {
          console.log("parlour: ", parlour);
          this.parlour = parlour;
          this.initForm(this.parlour);
        },
        error => console.log("ERROR"));
  }

  submit() {
    const formValue = this.form.value;
    formValue["parlour_id"] = this.parlour_id;

    if (this.parlour) {
      this.openService.put(`parlours/${this.parlour.id}/update`, formValue)
        .subscribe(
          (user: any) => {
            this.submitted = true;
            this.showSuccess();
          },
        error => {
            console.log(error);
            this.toastr.error(error['message'], error['statusText'], {timeOut: 3000});
        });
    }else {
      this.openService.post(`parlours`, formValue)
        .subscribe(
          (user: any) => {
            this.showSuccess();
            this.submitted = true;
          },
        error => {
          this.toastr.error(error['description'], error['title'], {timeOut: 3000});
        });
    }
  }

  showSuccess() {
    this.toastr.success('Parlour updated successfully!', '');
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }
  
}
