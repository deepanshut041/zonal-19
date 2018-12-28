import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormArray } from "@angular/forms";
import { MainService } from "../main.service";
import { ASSETS } from 'src/app/shared/assets';

@Component({
  selector: 'app-regsiter',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  LOADER_IMAGE = ASSETS + "/Loader.svg"
  registerForm: FormGroup
  particpantsForm: FormGroup
  recaptchaForm: FormGroup
  events: any[]
  max_participants: number
  total_participants: number
  participants: any[]
  SITE_KEY: string = "6Ld-VYQUAAAAAKb_EMJhaBY1sCFhOz_OZEpMaxrK"
  form_progress = false;
  form_success = false;
  form_error = false;
  form_success_message = "Successfully registered"
  form_error_message = "Please check your information correctly and try again"
  form_show = true;

  constructor(private fb: FormBuilder, private _mainService: MainService) {
    let emailFormat = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    let numberFormat = '^[0-9]*$';
    this.registerForm = fb.group({
      'college_name': [null, Validators.compose([Validators.required, Validators.maxLength(130), Validators.minLength(3)])],
      'college_code': [null, Validators.compose([Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern(numberFormat)])],
      'faculty_name': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2)])],
      'faculty_designation': [null, Validators.compose([Validators.required, Validators.maxLength(130), Validators.minLength(2)])],
      'faculty_gender': [null, Validators.compose([Validators.required])],
      'faculty_phn_no': [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(numberFormat)])],
      'faculty_email': [null, Validators.compose([Validators.required, Validators.pattern(emailFormat)])],
      'event': [null, Validators.compose([Validators.required])]
    });

    this.particpantsForm = fb.group({
      'participants': this.fb.array([]),
      'n_participants': [null, Validators.compose([Validators.required])]
    })

    this.recaptchaForm = fb.group({
      'recaptcha': [null, Validators.compose([Validators.required])]
    })

  }

  createItem(): FormGroup {
    let emailFormat = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    let numberFormat = '^[0-9]*$';
    return this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(3)])],
      'fathers_name': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(3)])],
      'university_roll': [null, Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern(numberFormat)])],
      'branch': [null, Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(3)])],
      'year': [null, Validators.compose([Validators.required])],
      'gender': [null, Validators.compose([Validators.required])],
      'aadhar_no': [null, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16), Validators.pattern(numberFormat)])],
      'phn_no': [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(numberFormat)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(emailFormat)])]
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
      this.particpantsForm.controls['n_participants'].setValue(0);
      this.participants = this.addParticipantsList(this.max_participants);
    })

    this.particpantsForm.controls['n_participants'].valueChanges.subscribe(value => {
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
    let control = <FormArray>this.particpantsForm.controls['participants']
    for (let i = control.length; i < maxp; i++) {
      control.push(this.createItem())
    }
  }

  resetParticipants(): void {
    let control = <FormArray>this.particpantsForm.controls['participants']

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


  submitForm() {
    if (this.registerForm.valid && this.particpantsForm.valid && this.recaptchaForm.valid) {
      this.form_progress = true;
      this.form_show = false;
      this.form_error = false;
      let values = Object.assign({}, this.registerForm.value, this.particpantsForm.value, this.recaptchaForm.value);
      this._mainService.regsiter(values).subscribe(
        (success) => {
          this.form_progress = false;
          this.form_success = true;
          setTimeout(() => {    //<<<---    using ()=> syntax
            this.registerForm.reset();
            this.resetParticipants();
            this.particpantsForm.reset();
            this.recaptchaForm.reset();
            this.form_success = false;
            this.form_show = true;
          }, 5000);

        }, (err) => {

          this.form_error = true;
          this.form_progress = false;
          this.form_show = true;
          this.form_error_message = "Please check your information correctly and try again";
        }
      )
    } else {
      this.form_error = true;
      this.form_error_message = "Don't try to hack you idiot, Tum se na ho paya";
    }
  }

  resolved(captchaResponse: string) {
    this.recaptchaForm.controls['recaptcha'].setValue(captchaResponse)
  }

  getControls() {
    return <FormArray>this.particpantsForm.get('participants');
  }
}
