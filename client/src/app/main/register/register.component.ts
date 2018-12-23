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
    this.registerForm = fb.group({
      'college_name': [null, Validators.compose([Validators.required])],
      'college_code': [null, Validators.compose([Validators.required])],
      'faculty_name': [null, Validators.compose([Validators.required])],
      'faculty_designation': [null, Validators.compose([Validators.required])],
      'faculty_phn_no': [null, Validators.compose([Validators.required])],
      'faculty_email': [null, Validators.compose([Validators.required])],
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
    return this.fb.group({
      'name': [null, Validators.compose([Validators.required])],
      'fathers_name': [null, Validators.compose([Validators.required])],
      'university_roll': [null, Validators.compose([Validators.required])],
      'branch': [null, Validators.compose([Validators.required])],
      'year': [null, Validators.compose([Validators.required])],
      'gender': [null, Validators.compose([Validators.required])],
      'aadhar_no': [null, Validators.compose([Validators.required])],
      'phn_no': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])]
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      console.log("Valid Form")
      this._mainService.regsiter(this.registerForm.value).subscribe(
        (resp) => {
          console.log(resp);
        }, (err) => {
          console.log(err);
        }
      )
    }else{
      console.log("Invalid Form")
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.registerForm.controls['recaptcha'].setValue(captchaResponse)
  }
}
