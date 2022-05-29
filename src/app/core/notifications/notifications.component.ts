import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenService, CommonService } from 'src/app/shared/services/open.service';
import { ToastrService } from 'ngx-toastr';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import { isValidEmail } from 'src/app/shared/utils';


export class FileValueAccessor implements ControlValueAccessor {
    value: any;
    onChange = (_) => {};
    onTouched = () => {};

    writeValue(value) {}
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
}


@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit  {
  submitted = false;
  form: FormGroup;
  parlour_id: any;
  user: any;
  consultants: any = [];
  days_selected: any = [];
  notify_consultants = []
  recepients: any = [];
  email: any

  constructor(public openService: OpenService,
    public service: CommonService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    }

  ngOnInit(): void {
    this.parlour_id = this.openService.getParlourId();
    this.user = this.openService.getUser()
    this.transition(this.user);

    // input.addEventListener('input', updateValue);


    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.getConsultants(id);
      }
    )
  }

  transition(user: any) {
    this.service.switchHeader(user);
  }

  getConsultants(parlour_id: any) {
    this.openService.getMany(`parlours/${parlour_id}/consultants`)
      .subscribe(
        consultants => {
          console.log(consultants);
          
          this.consultants = consultants;
        },
        error => console.log(error));
  }

  enterKeyPressed(event: any) {
    if (event.keyCode == 13) {
       console.log("Enter key is pressed");
       return true;
    } else {
       return false;
    }
  }

  submit() {
    this.addDayOfWeek();
    this.consultantEmails();
    let timeToSend = document.getElementById("timeToSend") as HTMLInputElement;
    console.log(this.recepients);
    console.log(this.days_selected);
  
    console.log(this.notify_consultants);
    console.log(timeToSend.value);
    if(this.recepients == []) {
      this.toastr.error("No users selected", "Error", {timeOut: 3000});
      return;
    }
    if(this.days_selected == []) {
      this.toastr.error("No week days selected", "Error", {timeOut: 3000});
      return;
    }

    if(timeToSend.value == null) {
      this.toastr.error("Time not set", "Error", {timeOut: 3000});
      return;
    }
  
    this.openService.post(`parlours/${this.user.id}/add_notifications`, {"recepients": this.recepients, "days": this.days_selected, "time": timeToSend.value, "consultants": this.notify_consultants})
      .subscribe(
        (result: any) => {
          this.showSuccess();
          this.submitted = true;
        },
      error => {
        let err = error['error'];
        this.toastr.error(err['description'], error['title'], {timeOut: 3000});
      });
  }

  showSuccess() {
    this.toastr.success('Notification saved successfully!', 'Success!!!');
  }

  goBack(event) {
    event.preventDefault();
    window.history.back();
  }

  showError(error) {
    let errors = {};
    errors = error.json();
    const description = errors.hasOwnProperty('errors') ? this.getErrorDetails(error) : errors['description'];
    this.toastr.error(description, errors['title'], {timeOut: 3000});
  }

  getErrorDetails(error) {
    const body = error.json();
    let dets = '';
    for (const key of Object.keys(body['errors'])) {
      dets += `${key} - ${body['errors'][key]}\n`;
    }
    return dets;
  }

  addDayOfWeek(){
    let checked_elements = document.getElementsByClassName("list-group-item");
    
    for (var i = 0; i < checked_elements.length; i++) {
      let val = checked_elements.item(i) as HTMLInputElement;

      if(val.checked){
        this.days_selected.push(val.id);
      }
    }
  }

  addMore(){
    if (!isValidEmail(this.email)) {
      this.toastr.error("Please enter a valid email address.", "Incorrect Email", {timeOut: 3000});
      return;
    }
    let tag = document.getElementById("emailList");
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(this.email));
    tag.appendChild(entry);
    this.recepients.push(this.email);

    this.email = '';

  }

  consultantEmails(){
    let checked_elements = document.getElementsByClassName("form-check-input");
    
    for (var i = 0; i < checked_elements.length; i++) {
      let val = checked_elements.item(i) as HTMLInputElement;

      if(val.checked){
        this.notify_consultants.push(val.id);
      }
    }
  }

}
