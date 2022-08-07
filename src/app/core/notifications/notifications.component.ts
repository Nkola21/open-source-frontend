import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  notification: any;
  user: any;
  permission: any;
  consultants: any = [];
  days_selected: any = [];
  notify_consultants = []
  recipients: any = [];
  email: any

  sunday: boolean = false;
  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  @ViewChildren('loadConsultants') things: QueryList<any>;

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
    this.permission = this.openService.getPermissions();
    this.transition(this.user);

    this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.getConsultants(id);
        this.getNotifications(id);
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
          this.consultants = consultants;
        },
        error => console.log(error));
  }

  getNotifications(parlour_id: any) {
    this.openService.getMany(`parlours/${parlour_id}/notifications`)
      .subscribe(
        notification => {
          if (Object.keys(notification).length > 0) {
            this.setWeekdays(notification["week_days"]);     
            this.notification = notification;
            this.setRecipients(notification["recipients"]);
            this.setConsultants(notification["consultants"]);
          }
        },
        error => {
          this.toastr.error(error["error"].title, error["error"].description);
        });
  }

  setWeekdays(days: string) {
    let days_list = days.split(", ");
    for(let i of days_list) {
      if (i == "0") {
        this.monday = true;
      }else if(i == "1") {
        this.tuesday = true;
      }else if(i == "2") {
        this.wednesday = true;
      }else if(i == "3") {
        this.thursday = true;
      }else if (i == "4") {
        this.friday = true;
      }else if (i == "5") {
        this.saturday = true;
      }else if(i == "6") {
        this.sunday = true;
      }
    }
  }

  getConsultantIds(consultants: any) {
    let ids = []
    for (let id of consultants.split(", ")) {
      ids.push(parseInt(id));
    }
    return ids;
  }

  setConsultants(consultants: any) {
    const ids = this.getConsultantIds(consultants);
    let collection = document.getElementsByClassName("form-check-input");

    for (let i = 0; i < consultants.length; i++) {
      if(collection[i] != undefined && collection[i].id != undefined && collection[i].id == "all") {
      }else if (collection[i] != undefined && collection[i].id != undefined && ids.includes(parseInt(collection[i].id))) {
        (<HTMLInputElement>collection[i]).checked = true;
      }
    }
  }

  setRecipients(recipients: any) {
    let recipient_list = recipients.split(", ")
    let tag = document.getElementById("emailList");
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(this.email));
    
    for (let recepient of recipient_list) {
      let entry = document.createElement('li');
      entry.appendChild(document.createTextNode(recepient));
      tag.appendChild(entry);
      this.recipients.push(recepient);
    }
  }

  enterKeyPressed(event: any) {
    if (event.keyCode == 13) {
       return true;
    } else {
       return false;
    }
  }

  getParlourName() {
    return this.permission == "Parlour" ? this.user.parlour_name : this.user.parlour.parlour_name
  }

  submit() {
    this.addDayOfWeek();
    this.consultantEmails();

    if(this.recipients == []) {
      this.toastr.error("No users selected", "Error", {timeOut: 3000});
      return;
    }
    if(this.days_selected == []) {
      this.toastr.error("No week days selected", "Error", {timeOut: 3000});
      return;
    }

    if (this.notification) {

      this.openService.put(`notifications/${this.notification.id}/edit_notifications`, {"recipients": this.recipients, "days": this.days_selected, "consultants": this.notify_consultants})
        .subscribe(
          (result: any) => {
            this.showSuccess();
            this.submitted = true;
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
    } else {
      this.openService.post(`parlours/${this.user.id}/add_notifications`, {"recipients": this.recipients, "days": this.days_selected, "consultants": this.notify_consultants})
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
  }

  sendEmail() {
    this.addDayOfWeek();
    this.consultantEmails();

    if(this.recipients == []) {
      this.toastr.error("No users selected", "Error", {timeOut: 3000});
      return;
    }
  
    this.openService.post(`parlours/${this.user.id}/send_notification`, {"recipients": this.recipients, "consultants": this.notify_consultants})
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

  showDeleteSuccess() {
    this.toastr.success('Notification deleted successfully!', 'Success!!!');
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

  reset() {
    let checked_elements = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("list-group-item");
    let uncheck_consultants = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("form-check-input");
    this.recipients = [];
    this.days_selected = [];

    (<HTMLInputElement>document.getElementById("timeToSend")).value = "";
    (<HTMLUListElement>document.getElementById("emailList")).innerHTML = "";
    for (let i of Object.keys(checked_elements)) {
      (<HTMLInputElement>checked_elements[i]).checked = false
    }

    for (let i of Object.keys(uncheck_consultants)) {
      (<HTMLInputElement>uncheck_consultants[i]).checked = false
    }

    this.deleteNotification(this.notification);
    this.notification = null;
  }

  deleteNotification(notification: any) {
    this.openService.delete(`notifications/${notification.id}/delete_notifications`)
        .subscribe(
          () => {
            this.showDeleteSuccess();
            this.submitted = true;
          },
        error => {
          let err = error['error'];
          this.toastr.error(err['description'], error['title'], {timeOut: 3000});
        });
  }

  addDayOfWeek(){
    let checked_elements = document.getElementsByClassName("list-group-item");
    this.days_selected = [];
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
    this.recipients.push(this.email);
    
    this.email = '';

  }

  consultantEmails(){
    let checked_elements = document.getElementsByClassName("form-check-input");
    
    this.notify_consultants = [];

    for (var i = 0; i < checked_elements.length; i++) {
      let val = checked_elements.item(i) as HTMLInputElement;

      if(val.checked){
        this.notify_consultants.push(val.id);
      }
    }
  }

}
