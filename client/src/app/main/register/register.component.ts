import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormArray } from "@angular/forms";
import { MainService } from "../main.service";

@Component({
  selector: 'app-regsiter',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup
  events: any[]
  max_participants: number
  total_participants: number
  participants: any[]
  SITE_KEY: string = "6Ld-VYQUAAAAAKb_EMJhaBY1sCFhOz_OZEpMaxrK"
  

  constructor(private fb: FormBuilder, private _mainService: MainService) {
    let emailFormat = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    let nameFormat = "[a-zA-Z\s]+$";
    let numberFormat = '^[0-9]*$';
    this.registerForm = fb.group({
      'college_name': [null, Validators.compose([Validators.required, Validators.maxLength(130), Validators.minLength(3), Validators.pattern(nameFormat)])],
      'college_code': [null, Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(numberFormat)])],
      'faculty_name': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2), Validators.pattern(nameFormat)])],
      'faculty_designation': [null, Validators.compose([Validators.required, Validators.maxLength(130), Validators.minLength(2), Validators.pattern(nameFormat)])],
      'faculty_gender': [null, Validators.compose([Validators.required])],
      'faculty_phn_no': [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(numberFormat)])],
      'faculty_email': [null, Validators.compose([Validators.required, Validators.pattern(emailFormat)])],
      'event': [null, Validators.compose([Validators.required])],
      'participants': this.fb.array([]),
      'n_participants': [null, Validators.compose([Validators.required])],
      'recaptcha': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this._mainService.getEventsShort().subscribe(
      (events) => {
        this.events = events;
        console.log(events)
      }, (err) => {
        console.log(err)
      }
    )
  }

  ngAfterViewInit(): void {
    this.registerForm.controls['event'].valueChanges.subscribe(value => {
      this.max_participants = parseInt(this.getEvent(value));
      this.registerForm.controls['n_participants'].setValue(0);
      this.participants = this.addParticipantsList(this.max_participants);
    })

    this.registerForm.controls['n_participants'].valueChanges.subscribe(value => {
      this.total_participants = parseInt(value);
      this.resetParticipants();
      this.addParticipants(this.total_participants);
    })
  }

  getEvent(id: string) {
    let maxp
    this.events.forEach(event => {
      if (parseInt(event['id']) == parseInt(id)) {
        maxp = event['maxp'];
      }
    });
    return maxp
  }

  addParticipants(maxp: number): void {
    let control = <FormArray>this.registerForm.controls['participants']
    for (let i = control.length; i < maxp; i++) {
      control.push(this.createItem())
    }
  }

  resetParticipants(): void {
    let control = <FormArray>this.registerForm.controls['participants']

    if (this.total_participants < control.length) {
      while (this.total_participants != control.length) {
        control.removeAt(control.length - 1);
      }
    }
    console.log(control.length)
    if (control.length == 0) {
      control.markAsPending()
    }
  }

  addParticipantsList(maxp: number): number[] {
    let participants = [];
    for (let i = 1; i <= maxp; i++) {
      participants.push(i);
    }
    return participants;
  }


  createItem(): FormGroup {
    let emailFormat = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    let nameFormat = "[a-zA-Z\s]+$";
    let numberFormat = '^[0-9]*$';
    return this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(nameFormat)])],
      'fathers_name': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(nameFormat)])],
      'university_roll': [null, Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(numberFormat)])],
      'branch': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(3), Validators.pattern(nameFormat)])],
      'year': [null, Validators.compose([Validators.required])],
      'gender': [null, Validators.compose([Validators.required])],
      'aadhar_no': [null, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16), Validators.pattern(numberFormat)])],
      'phn_no': [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(numberFormat)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(emailFormat)])]
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      console.log("Valid Form")
      this._mainService.regsiter(this.registerForm.value).subscribe(
        (resp) => {
          this.registerForm.reset();
        }, (err) => {
          console.log(err);
        }
      )
    }else{
      console.log("Invalid Form")
    }
  }

  resolved(captchaResponse: string) {
    this.registerForm.controls['recaptcha'].setValue(captchaResponse)
  }

  getControls() {
    return <FormArray>this.registerForm.get('participants');
  }
}
