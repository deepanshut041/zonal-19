import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-regsiter',
  templateUrl: './register.component.html',
  styleUrls: ['./navbar.component.css']
})
export class RegsiterComponent implements OnInit {
  registerForm: FormGroup
  participantsForm: FormGroup

  constructor(private fb:FormBuilder) {
    this.registerForm = fb.group({
      'college_name':  [null, Validators.compose([Validators.required])],
      'college_code':  [null, Validators.compose([Validators.required])],
      'faculty_name':  [null, Validators.compose([Validators.required])],
      'faculty_designation':  [null, Validators.compose([Validators.required])],
      'faculty_phn_no':  [null, Validators.compose([Validators.required])],
      'faculty_email':  [null, Validators.compose([Validators.required])],
      'event':  [null, Validators.compose([Validators.required])],
      'participants' : this.fb.array([])
    });
    this.participantsForm = fb.group({
      'name':  [null, Validators.compose([Validators.required])],
      'fathers_name':  [null, Validators.compose([Validators.required])],
      'university_roll':  [null, Validators.compose([Validators.required])],
      'branch':  [null, Validators.compose([Validators.required])],
      'year':  [null, Validators.compose([Validators.required])],
      'gender':  [null, Validators.compose([Validators.required])],
      'aadhar_no':  [null, Validators.compose([Validators.required])],
      'phn_no':  [null, Validators.compose([Validators.required])],
      'email':  [null, Validators.compose([Validators.required])]  
    });
   }

  ngOnInit() {
  }

}
