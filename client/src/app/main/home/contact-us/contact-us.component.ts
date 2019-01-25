import { Component, OnInit } from '@angular/core';
import { ASSETS } from 'src/app/shared/assets';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormArray } from "@angular/forms";
import { MainService } from '../../main.service';

@Component({
  selector: 'app-home-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

    CONTACT_US = ASSETS + '/ContactUs.svg';
    CONTACT_BG_IMG = ASSETS + '/map-bg.png';
    contactForm: FormGroup
    form_progress = false;
    form_success = false;
    form_error = false;
    form_success_message = "Message send successfully"
    form_error_message = "Please check your information correctly and try again"
    form_show = true;


    constructor(private fb: FormBuilder, private _mainService: MainService) {
      let emailFormat = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
      this.contactForm = fb.group({
        'first_name' : [null, Validators.compose([Validators.required, Validators.minLength(1)])],
        'last_name' : [null, Validators.compose([Validators.required, Validators.minLength(1)])],
        'email':[null, Validators.compose([Validators.required, Validators.pattern (emailFormat)])],
        'phone_number': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
        'subject': ['Query regarding technical zonal 2019'],
        'description': [null, Validators.compose([Validators.required])],
      })
    }
  
    ngOnInit() {
    }
  
    submitForm() {
      if (this.contactForm.valid) {
        this.form_progress = true;
        this.form_show = false;
        this.form_error = false;
        let values = Object.assign({}, this.contactForm.value);
        console.log(values)
        this._mainService.contactUs(values).subscribe(
          (success) => {
            this.form_progress = false;
            this.form_success = true;
            setTimeout(() => {
              this.contactForm.reset();
              this.form_success = false;
              this.form_show = true;
            }, 5000);
  
          }, (err) => {
            console.log(err);
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

}

  
  
